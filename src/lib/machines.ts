export type PhotoCallout = {
  x: number;
  y: number;
  label: string;
  side: "left" | "right";
};

export type Machine = {
  slug: string;
  machine: string;
  tag: string;
  badge?: string;
  threshold: number;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** who this machine fits, in infrastructure terms — not a spec, a placement */
  audienceFit: string;
  /** why this model is part of the Kavoprovid infrastructure, not a standalone product */
  infraNote: string;
  features: string[];
  photo?: {
    src: string;
    callouts: PhotoCallout[];
    aspectClassName?: string;
    marginPct?: number;
  };
};

export const MACHINES: Machine[] = [
  {
    slug: "bianchi-gaia-touch",
    machine: "Bianchi Gaia Touch",
    tag: "Просто і без зайвого",
    threshold: 10,
    metaTitle: "Оренда кавомашини Bianchi Gaia Touch для офісу — Kavoprovid",
    metaDescription:
      "Bianchi Gaia Touch в оренду для офісу у Києві та Київській області. Апарат, зерно, сервіс і підтримка — в одного партнера. 7 днів на пробу.",
    intro:
      "Bianchi Gaia Touch — рішення для команд, яким не потрібен зайвий функціонал: італійська машина без складного меню, яка готує каву, какао й напої з вершками за одне натискання. Підходить офісам, де головне — стабільний смак щодня, а не список із тридцяти напоїв.",
    audienceFit: "Невеликі офіси, де важлива простота",
    infraNote:
      "У кавовій інфраструктурі Kavoprovid ця модель закриває найпростіший сценарій: команда хоче каву, а не меню на тридцять позицій. Ми ставимо Gaia Touch там, де важливіша стабільність щодня, ніж різноманіття.",
    features: [
      "Італійська збірка, перевірена роками",
      "8 напоїв — цього досить майже завжди",
      "Какао й вершки без окремого бару",
    ],
    photo: {
      src: "/products/bianchi-gaia.png",
      aspectClassName: "aspect-square",
      marginPct: 20,
      callouts: [
        { x: 0.41, y: 0.21, label: "Італійська збірка", side: "left" },
        { x: 0.548, y: 0.28, label: "8 напоїв", side: "right" },
        { x: 0.44, y: 0.518, label: "Какао й вершки", side: "left" },
        { x: 0.548, y: 0.658, label: "Від 10 кг кави", side: "right" },
      ],
    },
  },
  {
    slug: "dr-coffee-minibar-s",
    machine: "Dr. Coffee Minibar S",
    tag: "Найбільший вибір напоїв",
    badge: "Обирають найчастіше",
    threshold: 15,
    metaTitle: "Оренда кавомашини Dr. Coffee Minibar S для офісу — Kavoprovid",
    metaDescription:
      "Dr. Coffee Minibar S — модель, яку обирають найчастіше. 24–30 напоїв, оренда для офісу в Києві та Київській області. 7 днів на пробу без підпису.",
    intro:
      "Dr. Coffee Minibar S — модель, яку клієнти обирають найчастіше: екран із зрозумілим меню на 24–30 напоїв, від класичного еспресо до какао з молочною піною, як у бариста. Універсальний вибір для офісу, де команда п'є каву по-різному.",
    audienceFit: "Офіси зі змішаними смаковими звичками",
    infraNote:
      "Ми підключаємо Minibar S там, де команда п'є каву по-різному — від еспресо до какао з піною. Це універсальний вузол інфраструктури: один апарат закриває майже весь запит офісу без додаткового обладнання.",
    features: [
      "Екран, у якому розберуться з першого разу",
      "24–30 напоїв — від еспресо до какао",
      "Молочна піна як у бариста",
      "Холодильник для молока в комплекті",
    ],
    photo: {
      src: "/products/dr-coffee-minibar-s.png",
      aspectClassName: "aspect-square",
      marginPct: 17,
      callouts: [
        { x: 0.348, y: 0.227, label: "24–30 напоїв", side: "left" },
        { x: 0.388, y: 0.306, label: "Простий екран", side: "left" },
        { x: 0.401, y: 0.526, label: "Молочна піна", side: "left" },
        { x: 0.625, y: 0.377, label: "Регульована температура", side: "right" },
        { x: 0.625, y: 0.588, label: "Молоко в комплекті", side: "right" },
      ],
    },
  },
  {
    slug: "dr-coffee-coffeebar-plus",
    machine: "Dr. Coffee Coffeebar Plus",
    tag: "Для щоденного навантаження",
    threshold: 15,
    metaTitle: "Оренда кавомашини Dr. Coffee Coffeebar Plus для офісу — Kavoprovid",
    metaDescription:
      "Dr. Coffee Coffeebar Plus витримує щоденний потік людей в офісі. Оренда для бізнесу в Києві та Київській області. 7 днів на пробу.",
    intro:
      "Dr. Coffee Coffeebar Plus зібрана під щоденний потік людей: металевий корпус витримує інтенсивне використання, а чашка готується за секунди — без черги біля апарата в пікові години.",
    audienceFit: "Офіси з інтенсивним щоденним потоком",
    infraNote:
      "Coffeebar Plus — наш вибір там, де апарат працює без пауз: метал витримує навантаження, а швидка видача не створює черги в пікові години. Вузол інфраструктури для офісів, де кава — фоновий процес, а не перерва.",
    features: [
      "Металевий корпус витримує щоденний потік людей",
      "24 напої без компромісів у смаку",
      "Чашка готова за секунди, не за хвилини",
      "Холодильник для молока в комплекті",
    ],
    photo: {
      src: "/products/dr-coffee-coffeebar-plus.png",
      aspectClassName: "aspect-square",
      marginPct: 17,
      callouts: [
        { x: 0.348, y: 0.245, label: "Металевий корпус", side: "left" },
        { x: 0.388, y: 0.324, label: "24 напої", side: "left" },
        { x: 0.401, y: 0.526, label: "Чашка за секунди", side: "left" },
        { x: 0.619, y: 0.359, label: "Регульована температура", side: "right" },
        { x: 0.619, y: 0.57, label: "Молоко в комплекті", side: "right" },
      ],
    },
  },
  {
    slug: "dr-coffee-coffeecenter",
    machine: "Dr. Coffee Coffeecenter",
    tag: "Коли черга не спиняється",
    threshold: 20,
    metaTitle: "Оренда кавомашини Dr. Coffee Coffeecenter для офісу — Kavoprovid",
    metaDescription:
      "Dr. Coffee Coffeecenter розрахований на промислове навантаження. Оренда для великих команд у Києві та Київській області.",
    intro:
      "Dr. Coffee Coffeecenter — апарат для промислового навантаження: великі контейнери не спорожніють до обіду, а машина не зупиняється навіть тоді, коли черга не припиняється.",
    audienceFit: "Виробництва та великі команди",
    infraNote:
      "Coffeecenter — базовий вузол інфраструктури для виробничих майданчиків і великих команд, де кава потрібна безперервно на кожній зміні. Великі контейнери й промисловий ресурс апарата означають менше візитів техніка й менше простоїв.",
    features: [
      "Розрахований на промислове навантаження",
      "Контейнери, які не спорожніють до обіду",
      "Не зупиняється навіть у пікові години",
      "Холодильник для молока в комплекті",
    ],
    photo: {
      src: "/products/dr-coffee-coffeecenter.png",
      aspectClassName: "aspect-square",
      marginPct: 17,
      callouts: [
        { x: 0.401, y: 0.174, label: "Контейнери, які не спорожніють", side: "left" },
        { x: 0.388, y: 0.324, label: "Не зупиняється в пікові години", side: "left" },
        { x: 0.302, y: 0.5, label: "Промислове навантаження", side: "left" },
        { x: 0.632, y: 0.456, label: "Холодильник у комплекті", side: "right" },
      ],
    },
  },
  {
    slug: "bianchi-talia-touch",
    machine: "Bianchi Talia Touch",
    tag: "Преміальний варіант",
    threshold: 15,
    metaTitle: "Оренда кавомашини Bianchi Talia Touch для офісу — Kavoprovid",
    metaDescription:
      "Bianchi Talia Touch — преміальна кавомашина в оренду для переговорних і представницьких офісів у Києві та Київській області.",
    intro:
      "Bianchi Talia Touch — преміальний варіант для переговорних і представницьких просторів: 12+ напоїв і чотири сухі інгредієнти для різноманіття, дизайн, який відповідає рівню зустрічей, що там проходять.",
    audienceFit: "Представницькі та переговорні простори",
    infraNote:
      "Talia Touch ми підключаємо там, де кавова точка — частина того, як компанія виглядає ззовні: перед клієнтами й партнерами, у переговорній. Преміальний вузол тієї самої інфраструктури, а не окремий преміум-продукт.",
    features: [
      "12+ напоїв на будь-який смак у команді",
      "4 сухих інгредієнти для різноманіття",
      "Дизайн, який не соромно поставити в переговорній",
    ],
    photo: {
      src: "/products/bianchi-vending.png",
      aspectClassName: "aspect-square",
      marginPct: 20,
      callouts: [
        { x: 0.44, y: 0.139, label: "4 інгредієнти", side: "left" },
        { x: 0.47, y: 0.28, label: "12+ напоїв", side: "left" },
        { x: 0.53, y: 0.518, label: "Преміальний дизайн", side: "right" },
      ],
    },
  },
];

export function getMachine(slug: string): Machine | undefined {
  return MACHINES.find((m) => m.slug === slug);
}

/** Included with every Dr. Coffee rental — same unit across all three models. */
export const MILK_FRIDGE_PHOTO = {
  src: "/machines/milk-fridge.png",
  callouts: [
    { x: 0.42, y: 0.3, label: "Регульована температура", side: "left" as const },
    { x: 0.42, y: 0.57, label: "Молоко завжди свіже", side: "right" as const },
  ],
};
