import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  company?: string;
  employees?: string;
  volume?: string;
  source?: string;
};

async function reportLeadToGA4(request: Request, formSource: string) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return;

  const cookieHeader = request.headers.get("cookie") ?? "";
  const gaCookieMatch = cookieHeader.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  const clientId = gaCookieMatch?.[1] ?? crypto.randomUUID();

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          events: [{ name: "generate_lead", params: { form_source: formSource } }],
        }),
      },
    );
  } catch (err) {
    console.error("GA4 Measurement Protocol request failed", err);
  }
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const company = (body.company ?? "").trim();
  const employees = (body.employees ?? "").trim();
  const volume = (body.volume ?? "").trim();
  const source = (body.source ?? "сайт").trim();

  if (!name || !phone || !company || !employees || !volume) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const text = [
    "Нова заявка з сайту",
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    `Компанія: ${company}`,
    `Співробітників: ${employees}`,
    `Об'єм кави на місяць: ${volume}`,
    `Джерело: ${source}`,
  ]
    .filter(Boolean)
    .join("\n");

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    },
  );

  if (!telegramRes.ok) {
    console.error("Telegram sendMessage failed", await telegramRes.text());
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  await reportLeadToGA4(request, source);

  return NextResponse.json({ ok: true });
}
