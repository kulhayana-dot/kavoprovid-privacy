import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Політика конфіденційності — Kavoprovid",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-paper pb-24 pt-32 text-ink">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Політика конфіденційності сайту Kavoprovid
          </h1>
          <p className="mt-3 text-sm text-ink/60">
            Дата набрання чинності: 3 серпня 2026 р.
          </p>

          <div className="mt-8 space-y-6 text-ink/70">
            <p>
              Ця Політика конфіденційності описує, як ТОВ «ЮНІТ КЕЙ»
              (ЄДРПОУ 46306370, далі — «Компанія», «ми») обробляє дані
              відвідувачів сайту kavoprovid.com.ua.
            </p>
            <p>
              Ця Політика стосується виключно сайту. Клієнти, які
              користуються окремим мобільним застосунком Kavoprovid для
              замовлення супутніх товарів, керуються окремою політикою
              конфіденційності застосунку — вона тут не публікується.
            </p>
          </div>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              1. Яку інформацію ми збираємо
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>
                <strong className="text-ink">Дані веб-аналітики:</strong>{" "}
                тип пристрою та браузера, орієнтовне місцезнаходження за
                IP-адресою, сторінки, які ви переглядаєте, час перебування
                на сайті, джерело переходу. Збираються автоматично за
                допомогою cookie-файлів.
              </li>
              <li>
                <strong className="text-ink">Контактні дані:</strong> лише
                якщо ви самі телефонуєте чи пишете на номер або email,
                вказані на сайті. Сайт не має форм, що збирають дані
                автоматично.
              </li>
              <li>
                <strong className="text-ink">Технічні журнали сервера:</strong>{" "}
                стандартні для будь-якого сайту логи хостинг-провайдера.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              2. Cookie-файли та аналітика
            </h2>
            <p className="mt-4 text-ink/70">
              Сайт використовує аналітичні cookie-файли — щоб розуміти,
              які розділи цікавлять відвідувачів, і покращувати контент.
              При першому візиті ви обираєте «Прийняти» або «Відхилити» у
              банері внизу сторінки; аналітичні cookie-файли встановлюються
              лише після згоди. Змінити свій вибір можна будь-коли через
              посилання «Налаштування cookie-файлів» у футері сайту.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              3. Мета обробки
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>
                Розуміти, які розділи сайту цікавлять відвідувачів, і
                покращувати контент.
              </li>
              <li>
                Відповідати на звернення, залишені за контактами,
                вказаними на сайті.
              </li>
              <li>Забезпечувати технічну роботу та безпеку сайту.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              4. Передача даних третім особам
            </h2>
            <p className="mt-4 text-ink/70">
              Ми не продаємо дані відвідувачів третім особам. Дані можуть
              передаватися виключно:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>
                Постачальникам сервісів веб-аналітики — в межах їхніх
                власних політик конфіденційності;
              </li>
              <li>
                Постачальникам технічної інфраструктури (хостинг), які
                забезпечують роботу сайту;
              </li>
              <li>
                У випадках, передбачених законодавством України
                (наприклад, на запит уповноважених органів).
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              5. Зберігання даних
            </h2>
            <p className="mt-4 text-ink/70">
              Аналітичні дані зберігаються відповідно до налаштувань
              використовуваного аналітичного інструменту. Контактні дані,
              отримані через звернення, зберігаються протягом строку,
              необхідного для відповіді та подальшої співпраці.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              6. Ваші права
            </h2>
            <p className="mt-4 text-ink/70">Ви маєте право:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>
                Отримати інформацію про те, які дані про вас
                обробляються;
              </li>
              <li>Вимагати виправлення чи видалення цих даних;</li>
              <li>
                Відкликати чи змінити згоду на аналітичні cookie-файли
                через посилання «Налаштування cookie-файлів» у футері
                сайту або в налаштуваннях браузера;
              </li>
              <li>
                Звернутися за контактами нижче з будь-яким питанням щодо
                цієї Політики.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              7. Діти
            </h2>
            <p className="mt-4 text-ink/70">
              Сайт орієнтований на представників бізнесу і не призначений
              для осіб віком до 18 років.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              8. Зміни до цієї Політики
            </h2>
            <p className="mt-4 text-ink/70">
              Ми можемо періодично оновлювати цю Політику конфіденційності.
              Актуальна версія завжди доступна за цим посиланням. Дата
              останнього оновлення вказана на початку сторінки.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              9. Контакти
            </h2>
            <div className="chamfer-sm mt-4 border border-ink/10 bg-ink/[0.03] p-6">
              <p className="text-ink/70">
                <strong className="text-ink">ТОВ «ЮНІТ КЕЙ»</strong>
                <br />
                ЄДРПОУ: 46306370
                <br />
                Адреса: 36 Kyivskyi Shliakh Street, Baryshivka, Brovarskyi
                District, Kyiv Oblast, 07501, Ukraine
                <br />
                Email:{" "}
                <a
                  href="mailto:kulha.yana@kavaservice.com.ua"
                  className="text-ink underline"
                >
                  kulha.yana@kavaservice.com.ua
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
