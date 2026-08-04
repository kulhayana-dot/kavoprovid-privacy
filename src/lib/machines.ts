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
  features: string[];
  photo?: { src: string; callouts: PhotoCallout[] };
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
    features: [
      "Італійська збірка, перевірена роками",
      "8 напоїв — цього досить майже завжди",
      "Какао й вершки без окремого бару",
    ],
    photo: {
      src: "/machines/bianchi-gaia-touch.png",
      callouts: [
        { x: 0.428, y: 0.183, label: "Італійська збірка", side: "left" },
        { x: 0.476, y: 0.324, label: "8 напоїв", side: "right" },
        { x: 0.471, y: 0.553, label: "Какао й вершки", side: "left" },
        { x: 0.471, y: 0.817, label: "Від 10 кг кави", side: "right" },
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
    features: [
      "Екран, у якому розберуться з першого разу",
      "24–30 напоїв — від еспресо до какао",
      "Молочна піна як у бариста",
      "Холодильник для молока в комплекті",
    ],
  },
  {
    slug: "dr-coffee-coffeebar-s",
    machine: "Dr. Coffee Coffeebar S",
    tag: "Для щоденного навантаження",
    threshold: 15,
    metaTitle: "Оренда кавомашини Dr. Coffee Coffeebar S для офісу — Kavoprovid",
    metaDescription:
      "Dr. Coffee Coffeebar S витримує щоденний потік людей в офісі. Оренда для бізнесу в Києві та Київській області. 7 днів на пробу.",
    intro:
      "Dr. Coffee Coffeebar S зібрана під щоденний потік людей: металевий корпус витримує інтенсивне використання, а чашка готується за секунди — без черги біля апарата в пікові години.",
    features: [
      "Металевий корпус витримує щоденний потік людей",
      "24 напої без компромісів у смаку",
      "Чашка готова за секунди, не за хвилини",
      "Холодильник для молока в комплекті",
    ],
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
    features: [
      "Розрахований на промислове навантаження",
      "Контейнери, які не спорожніють до обіду",
      "Не зупиняється навіть у пікові години",
      "Холодильник для молока в комплекті",
    ],
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
    features: [
      "12+ напоїв на будь-який смак у команді",
      "4 сухих інгредієнти для різноманіття",
      "Дизайн, який не соромно поставити в переговорній",
    ],
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
