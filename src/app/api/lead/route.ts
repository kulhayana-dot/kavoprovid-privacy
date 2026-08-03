import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  company?: string;
  source?: string;
};

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
  const source = (body.source ?? "сайт").trim();

  if (!name || !phone) {
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
    company ? `Компанія: ${company}` : null,
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

  return NextResponse.json({ ok: true });
}
