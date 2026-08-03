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
      <main className="bg-paper pb-24 pt-32 text-ink">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Політика конфіденційності застосунку Kavoprovid
          </h1>
          <p className="mt-3 text-sm text-ink/50">
            Дата набрання чинності: 23 липня 2026 р.
          </p>

          <div className="mt-8 space-y-6 text-ink/70">
            <p>
              Ця Політика конфіденційності описує, як ТОВ «ЮНІТ КЕЙ»
              (ЄДРПОУ 46306370, далі — «Компанія», «ми») збирає, використовує
              та захищає інформацію користувачів мобільного застосунку
              Kavoprovid (далі — «Застосунок»).
            </p>
            <p>
              Застосунок призначений для клієнтів Компанії — юридичних осіб
              та ФОП, які орендують кавові апарати та замовляють супутні
              товари. Реєстрація в Застосунку доступна виключно для
              клієнтів, з якими Компанія вже має договірні відносини.
            </p>
          </div>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              1. Яку інформацію ми збираємо
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>
                <strong className="text-ink">Реєстраційні дані:</strong>{" "}
                номер телефону та код ЄДРПОУ/ІПН, які використовуються для
                входу в Застосунок та ідентифікації вашої компанії в нашій
                обліковій системі.
              </li>
              <li>
                <strong className="text-ink">Дані замовлень:</strong> перелік
                і кількість замовлених товарів, коментарі до замовлення,
                адреса доставки (якщо вказана).
              </li>
              <li>
                <strong className="text-ink">Технічні дані:</strong> тип
                пристрою та версія операційної системи — використовуються
                виключно для забезпечення коректної роботи Застосунку та
                виправлення технічних помилок.
              </li>
            </ul>
            <p className="mt-4 text-ink/70">
              Застосунок не збирає дані про геолокацію, контакти з
              телефонної книги, фото чи інші дані, не пов&apos;язані
              безпосередньо з оформленням замовлення.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              2. Як ми використовуємо інформацію
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>
                Для ідентифікації клієнта та надання доступу до
                персонального каталогу товарів і цін.
              </li>
              <li>
                Для обробки та виконання замовлень, включно з передачею
                замовлення до нашої облікової системи (1С).
              </li>
              <li>Для зв&apos;язку з вами щодо статусу замовлення, за потреби.</li>
              <li>Для покращення роботи Застосунку.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              3. Передача даних третім особам
            </h2>
            <p className="mt-4 text-ink/70">
              Ми не продаємо і не передаємо ваші персональні дані третім
              особам для маркетингових цілей. Дані можуть передаватися
              виключно:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>
                Постачальникам технічної інфраструктури (хостинг сервера,
                хмарні сервіси), які забезпечують роботу Застосунку, і які
                зобов&apos;язані дотримуватись конфіденційності;
              </li>
              <li>
                У випадках, передбачених законодавством України (наприклад,
                на запит уповноважених органів).
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              4. Зберігання даних
            </h2>
            <p className="mt-4 text-ink/70">
              Дані зберігаються в обліковій системі Компанії протягом усього
              періоду співпраці з клієнтом та після її завершення —
              відповідно до строків, передбачених законодавством України
              щодо бухгалтерського та податкового обліку.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              5. Безпека
            </h2>
            <p className="mt-4 text-ink/70">
              Ми застосовуємо технічні та організаційні заходи для захисту
              ваших даних від несанкціонованого доступу, втрати чи
              розголошення, включно з шифрованим з&apos;єднанням між
              Застосунком та сервером.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              6. Ваші права
            </h2>
            <p className="mt-4 text-ink/70">Ви маєте право:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/70">
              <li>Отримати інформацію про те, які дані про вас зберігаються;</li>
              <li>Вимагати виправлення неточних даних;</li>
              <li>
                Вимагати видалення ваших даних (за умови завершення
                договірних зобов&apos;язань);
              </li>
              <li>
                Відкликати згоду на обробку даних, звернувшись за контактами
                нижче.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display border-l-4 border-signal pl-4 text-xl font-bold">
              7. Діти
            </h2>
            <p className="mt-4 text-ink/70">
              Застосунок призначений виключно для представників юридичних
              осіб та ФОП і не призначений для осіб віком до 18 років.
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
