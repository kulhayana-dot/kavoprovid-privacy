export type PhotoCallout = {
  x: number;
  y: number;
  label: string;
  side: "left" | "right";
};

/** Manufacturer specs, as supplied by Kavoprovid — not estimated. */
export type MachineSpecs = {
  drinksCount: number;
  ingredientsCount: number;
  milk: "Свіже (холодильник)" | "Сухе" | "Сухе / рідке";
  dailyCapacity: number;
  hourlyCapacity: number;
  waterTankL: string;
  beanHopperKg: string;
  powderHopperKg?: string;
  groundsCapacity: string;
  powerW: string;
  plumbing: boolean;
  drainage: boolean;
  weightKg: number;
  dimensionsCm: string;
  fridgeWeightKg?: number;
  fridgeDimensionsCm?: string;
};

export type Machine = {
  slug: string;
  machine: string;
  brand: "Dr. Coffee" | "Bianchi";
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
  specs: MachineSpecs;
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
    brand: "Bianchi",
    tag: "Просто і без зайвого",
    threshold: 10,
    metaTitle: "Оренда кавомашини Bianchi Gaia Touch для офісу — Kavoprovid",
    metaDescription:
      "Bianchi Gaia Touch в оренду для офісу у Києві та Київській області. Кавомашина, зерно, сервіс і підтримка — в одного партнера. 7 днів на пробу.",
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
    specs: {
      drinksCount: 8,
      ingredientsCount: 3,
      milk: "Сухе",
      dailyCapacity: 200,
      hourlyCapacity: 60,
      waterTankL: "3,6 л",
      beanHopperKg: "1,35 кг",
      powderHopperKg: "~2 / 1,2 кг",
      groundsCapacity: "~50 порцій",
      powerW: "1800 Вт",
      plumbing: true,
      drainage: false,
      weightKg: 25,
      dimensionsCm: "47,5×31×63,5",
    },
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
    brand: "Dr. Coffee",
    tag: "Найбільший вибір напоїв",
    badge: "Обирають найчастіше",
    threshold: 15,
    metaTitle: "Оренда кавомашини Dr. Coffee Minibar S для офісу — Kavoprovid",
    metaDescription:
      "Dr. Coffee Minibar S — модель, яку обирають найчастіше. 24 напої, оренда для офісу в Києві та Київській області. 7 днів на пробу без підпису.",
    intro:
      "Dr. Coffee Minibar S — модель, яку клієнти обирають найчастіше: екран із зрозумілим меню на 24 напої, від класичного еспресо до какао з молочною піною, як у бариста. Універсальний вибір для офісу, де команда п'є каву по-різному.",
    audienceFit: "Офіси зі змішаними смаковими звичками",
    infraNote:
      "Ми підключаємо Minibar S там, де команда п'є каву по-різному — від еспресо до какао з піною. Це універсальний вузол інфраструктури: одна кавомашина закриває майже весь запит офісу без додаткового обладнання.",
    features: [
      "Екран, у якому розберуться з першого разу",
      "24 напої — від еспресо до какао",
      "Свіже молоко з холодильника в комплекті",
      "До 200 чашок на добу (100 на годину в пік)",
    ],
    specs: {
      drinksCount: 24,
      ingredientsCount: 3,
      milk: "Свіже (холодильник)",
      dailyCapacity: 200,
      hourlyCapacity: 100,
      waterTankL: "4 л",
      beanHopperKg: "1,5 кг",
      powderHopperKg: "~2 кг",
      groundsCapacity: "~50 порцій",
      powerW: "2900 Вт",
      plumbing: true,
      drainage: true,
      weightKg: 25,
      dimensionsCm: "54,5×34×62",
      fridgeWeightKg: 12,
      fridgeDimensionsCm: "47×24×47,2",
    },
    photo: {
      src: "/products/dr-coffee-minibar-s.png",
      aspectClassName: "aspect-square",
      marginPct: 17,
      callouts: [
        { x: 0.348, y: 0.227, label: "24 напої", side: "left" },
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
    brand: "Dr. Coffee",
    tag: "Для щоденного навантаження",
    threshold: 15,
    metaTitle: "Оренда кавомашини Dr. Coffee Coffeebar Plus для офісу — Kavoprovid",
    metaDescription:
      "Dr. Coffee Coffeebar Plus витримує щоденний потік людей в офісі. Оренда для бізнесу в Києві та Київській області. 7 днів на пробу.",
    intro:
      "Dr. Coffee Coffeebar Plus зібрана під щоденний потік людей: металевий корпус витримує інтенсивне використання, а чашка готується за секунди — без черги біля кавомашини в пікові години.",
    audienceFit: "Офіси з інтенсивним щоденним потоком",
    infraNote:
      "Coffeebar Plus — наш вибір там, де кавомашина працює без пауз: метал витримує навантаження, а швидка видача не створює черги в пікові години. Вузол інфраструктури для офісів, де кава — фоновий процес, а не перерва.",
    features: [
      "Металевий корпус витримує щоденний потік людей",
      "24 напої без компромісів у смаку",
      "Чашка готова за секунди, не за хвилини",
      "Холодильник для молока в комплекті",
    ],
    specs: {
      drinksCount: 24,
      ingredientsCount: 3,
      milk: "Свіже (холодильник)",
      dailyCapacity: 200,
      hourlyCapacity: 100,
      waterTankL: "4 л",
      beanHopperKg: "1,5 кг",
      powderHopperKg: "~2 кг",
      groundsCapacity: "~50 порцій",
      powerW: "2900 Вт",
      plumbing: true,
      drainage: true,
      weightKg: 26.5,
      dimensionsCm: "54,5×34×62",
      fridgeWeightKg: 12,
      fridgeDimensionsCm: "47×24×47,2",
    },
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
    brand: "Dr. Coffee",
    tag: "Коли черга не спиняється",
    threshold: 20,
    metaTitle: "Оренда кавомашини Dr. Coffee Coffeecenter для офісу — Kavoprovid",
    metaDescription:
      "Dr. Coffee Coffeecenter розрахований на промислове навантаження. Оренда для великих команд у Києві та Київській області.",
    intro:
      "Dr. Coffee Coffeecenter — кавомашина для промислового навантаження: великі контейнери не спорожніють до обіду, а машина не зупиняється навіть тоді, коли черга не припиняється.",
    audienceFit: "Виробництва та великі команди",
    infraNote:
      "Coffeecenter — базовий вузол інфраструктури для виробничих майданчиків і великих команд, де кава потрібна безперервно на кожній зміні. Великі контейнери й промисловий ресурс кавомашини означають менше візитів техніка й менше простоїв.",
    features: [
      "24 напої, 5 видів сухих інгредієнтів",
      "До 200 чашок на добу (100 на годину в пік)",
      "Пряме підключення до водопроводу — без бункера для води",
      "Холодильник для молока в комплекті",
    ],
    specs: {
      drinksCount: 24,
      ingredientsCount: 5,
      milk: "Свіже (холодильник)",
      dailyCapacity: 200,
      hourlyCapacity: 100,
      waterTankL: "Без бункера (прямий підвід)",
      beanHopperKg: "1,2 кг",
      powderHopperKg: "~2 / 1,5 / 2 кг",
      groundsCapacity: "~50 порцій",
      powerW: "2100 Вт",
      plumbing: true,
      drainage: true,
      weightKg: 37,
      dimensionsCm: "56×37×69",
      fridgeWeightKg: 12,
      fridgeDimensionsCm: "47×24×47,2",
    },
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
    brand: "Bianchi",
    tag: "Преміальний варіант",
    threshold: 15,
    metaTitle: "Оренда кавомашини Bianchi Talia Touch для офісу — Kavoprovid",
    metaDescription:
      "Bianchi Talia Touch — преміальна кавомашина в оренду для переговорних і представницьких офісів у Києві та Київській області.",
    intro:
      "Bianchi Talia Touch — преміальний варіант для переговорних і представницьких просторів: 12 напоїв і чотири сухі інгредієнти для різноманіття, дизайн, який відповідає рівню зустрічей, що там проходять.",
    audienceFit: "Представницькі та переговорні простори",
    infraNote:
      "Talia Touch ми підключаємо там, де кавова точка — частина того, як компанія виглядає ззовні: перед клієнтами й партнерами, у переговорній. Преміальний вузол тієї самої інфраструктури, а не окремий преміум-продукт.",
    features: [
      "12 напоїв на будь-який смак у команді",
      "4 сухих інгредієнти для різноманіття",
      "Дизайн, який не соромно поставити в переговорній",
    ],
    specs: {
      drinksCount: 12,
      ingredientsCount: 4,
      milk: "Сухе",
      dailyCapacity: 200,
      hourlyCapacity: 60,
      waterTankL: "Без бункера",
      beanHopperKg: "1,3 кг",
      powderHopperKg: "~2 / 1,2 / 1,2 кг",
      groundsCapacity: "~50 порцій",
      powerW: "1800 Вт",
      plumbing: true,
      drainage: false,
      weightKg: 31.5,
      dimensionsCm: "57,6×39,5×72",
    },
    photo: {
      src: "/products/bianchi-vending.png",
      aspectClassName: "aspect-square",
      marginPct: 20,
      callouts: [
        { x: 0.44, y: 0.139, label: "4 інгредієнти", side: "left" },
        { x: 0.47, y: 0.28, label: "12 напоїв", side: "left" },
        { x: 0.53, y: 0.518, label: "Преміальний дизайн", side: "right" },
      ],
    },
  },
];

export function getMachine(slug: string): Machine | undefined {
  return MACHINES.find((m) => m.slug === slug);
}

/**
 * For the comparison panel only. Models Kavoprovid supplies specs for but
 * doesn't yet have photos/detail pages for — kept out of MACHINES so they
 * never show up as photo-less cards in the catalog or /rishennya listing.
 */
export type ComparisonMachine = {
  slug: string;
  machine: string;
  brand: "Dr. Coffee" | "Bianchi";
  specs: MachineSpecs;
  hasPhoto: boolean;
  photoSrc?: string;
  detailHref?: string;
};

const NEW_MACHINES: ComparisonMachine[] = [
  {
    slug: "dr-coffee-f200",
    machine: "Dr. Coffee F200",
    brand: "Dr. Coffee",
    hasPhoto: false,
    specs: {
      drinksCount: 24,
      ingredientsCount: 5,
      milk: "Свіже (холодильник)",
      dailyCapacity: 200,
      hourlyCapacity: 100,
      waterTankL: "6 л",
      beanHopperKg: "0,7 / 0,7 кг (2 види зерна)",
      powderHopperKg: "~1 / 1,5 кг",
      groundsCapacity: "~50 порцій",
      powerW: "2900 Вт",
      plumbing: true,
      drainage: true,
      weightKg: 28.5,
      dimensionsCm: "54×40,5×66",
      fridgeWeightKg: 12,
      fridgeDimensionsCm: "47×24×47,2",
    },
  },
  {
    slug: "dr-coffee-f16",
    machine: "Dr. Coffee F16",
    brand: "Dr. Coffee",
    hasPhoto: false,
    specs: {
      drinksCount: 24,
      ingredientsCount: 2,
      milk: "Свіже (холодильник)",
      dailyCapacity: 100,
      hourlyCapacity: 70,
      waterTankL: "8 л",
      beanHopperKg: "1 кг",
      groundsCapacity: "~50 порцій",
      powerW: "1500 Вт",
      plumbing: true,
      drainage: true,
      weightKg: 19.5,
      dimensionsCm: "50×34×58",
      fridgeWeightKg: 12,
      fridgeDimensionsCm: "47×24×47,2",
    },
  },
  {
    slug: "dr-coffee-f22",
    machine: "Dr. Coffee F22",
    brand: "Dr. Coffee",
    hasPhoto: false,
    specs: {
      drinksCount: 24,
      ingredientsCount: 6,
      milk: "Свіже (холодильник)",
      dailyCapacity: 300,
      hourlyCapacity: 100,
      waterTankL: "4 л",
      beanHopperKg: "0,7 / 0,7 кг (2 види зерна)",
      powderHopperKg: "1 / 1,5 / 1 кг",
      groundsCapacity: "~50 порцій",
      powerW: "4050–5400 Вт",
      plumbing: true,
      drainage: true,
      weightKg: 51,
      dimensionsCm: "56×53×66",
      fridgeWeightKg: 12,
      fridgeDimensionsCm: "47×24×47,2",
    },
  },
  {
    slug: "dr-coffee-f12",
    machine: "Dr. Coffee F12",
    brand: "Dr. Coffee",
    hasPhoto: false,
    specs: {
      drinksCount: 24,
      ingredientsCount: 2,
      milk: "Свіже (холодильник)",
      dailyCapacity: 100,
      hourlyCapacity: 70,
      waterTankL: "2 / 8 л",
      beanHopperKg: "1,2 кг",
      groundsCapacity: "~50 порцій",
      powerW: "2900 Вт",
      plumbing: true,
      drainage: false,
      weightKg: 17.5,
      dimensionsCm: "50×30×58",
      fridgeWeightKg: 12,
      fridgeDimensionsCm: "47×24×47,2",
    },
  },
  {
    slug: "bianchi-desia-m",
    machine: "Bianchi Desia M",
    brand: "Bianchi",
    hasPhoto: false,
    specs: {
      drinksCount: 30,
      ingredientsCount: 4,
      milk: "Сухе / рідке",
      dailyCapacity: 200,
      hourlyCapacity: 60,
      waterTankL: "Без бункера",
      beanHopperKg: "1,3 кг",
      powderHopperKg: "~2 / 1,2 / 1,2 кг",
      groundsCapacity: "~50 порцій",
      powerW: "2600 Вт",
      plumbing: true,
      drainage: true,
      weightKg: 41,
      dimensionsCm: "59×40,5×73",
    },
  },
];

export const COMPARISON_MACHINES: ComparisonMachine[] = [
  ...MACHINES.map(
    (m): ComparisonMachine => ({
      slug: m.slug,
      machine: m.machine,
      brand: m.brand,
      specs: m.specs,
      hasPhoto: Boolean(m.photo),
      photoSrc: m.photo?.src,
      detailHref: `/rishennya/${m.slug}`,
    }),
  ),
  ...NEW_MACHINES,
];

/** Included with every Dr. Coffee rental — same unit across all three models. */
export const MILK_FRIDGE_PHOTO = {
  src: "/machines/milk-fridge.png",
  callouts: [
    { x: 0.42, y: 0.3, label: "Регульована температура", side: "left" as const },
    { x: 0.42, y: 0.57, label: "Молоко завжди свіже", side: "right" as const },
  ],
};
