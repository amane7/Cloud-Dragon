// Sample data for the Tagr / Cloud Dragon demo app.

export type FaceKey =
  | "work"
  | "student"
  | "creator"
  | "family"
  | "community";

export interface Face {
  key: FaceKey;
  name: string;
  emoji: string;
  role: string;
  bio: string;
  highlights: string[];
  accent: string; // tailwind color
}

export interface Person {
  id: string;
  name: string;
  handle: string;
  initials: string;
  defaultFace: FaceKey;
  city: string;
  tags: string[];
  meta: { metAt: string; place: string; via: string };
  positives: { label: string; from: string }[];
  negatives: { label: string; from: string }[];
  trust: number; // 0-100
  reliability: number;
  contribution: number;
}

export const myFaces: Face[] = [
  {
    key: "work",
    name: "プロダクトデザイナー",
    emoji: "💼",
    role: "Cloud Dragon / PdM",
    bio:
      "B2B SaaSのプロダクトを5年。新規事業の0→1とブランド体験設計が専門。",
    highlights: ["Figma", "Design System", "Storybook", "0→1"],
    accent: "from-teal-300 to-teal-600",
  },
  {
    key: "student",
    name: "大学院生",
    emoji: "🎓",
    role: "HCI Lab・修士2年",
    bio: "人と人の「あいだ」のインタラクションを研究。NFC × Identity がテーマ。",
    highlights: ["HCI", "Research", "Figma", "Python"],
    accent: "from-violet-400 to-violet-700",
  },
  {
    key: "creator",
    name: "クリエイター",
    emoji: "🎧",
    role: "Beatmaker / Indie Dev",
    bio: "週末はビートを刻み、Indie Devとして個人開発もしています。",
    highlights: ["Ableton", "TypeScript", "WebGL", "Music"],
    accent: "from-rose-400 to-rose-600",
  },
  {
    key: "family",
    name: "家族としての私",
    emoji: "🌿",
    role: "2児の親",
    bio: "東京・世田谷在住。週末は公園と銭湯が定位置です。",
    highlights: ["世田谷", "銭湯", "キャンプ", "コーヒー"],
    accent: "from-amber-300 to-amber-600",
  },
  {
    key: "community",
    name: "コミュニティ運営",
    emoji: "🐉",
    role: "Fight Club / Mentor",
    bio: "学生起業家のメンタリングと、コミュニティイベントを月1で企画。",
    highlights: ["メンタリング", "Pitch", "Community"],
    accent: "from-cyan-300 to-blue-600",
  },
];

export const people: Person[] = [
  {
    id: "p_001",
    name: "佐藤 健司",
    handle: "@kenji_sato",
    initials: "KS",
    defaultFace: "work",
    city: "Tokyo",
    tags: ["Product", "Startup", "B2B SaaS"],
    meta: {
      metAt: "2026-05-12 19:24",
      place: "Cloud Dragon Garage",
      via: "NFC Tap",
    },
    positives: [
      { label: "プレゼンが圧倒的にうまい", from: "@river_w" },
      { label: "細部の詰めが鬼", from: "@nana.k" },
      { label: "巻き込み力", from: "Fight Club" },
    ],
    negatives: [
      { label: "返信が遅い時がある", from: "@chrono" },
    ],
    trust: 88,
    reliability: 82,
    contribution: 91,
  },
  {
    id: "p_002",
    name: "中村 凛",
    handle: "@rin_n",
    initials: "RN",
    defaultFace: "creator",
    city: "Kyoto",
    tags: ["Music", "Beatmaker", "Sound Design"],
    meta: {
      metAt: "2026-05-04 22:11",
      place: "下北沢 SHELTER",
      via: "NFC Tap",
    },
    positives: [
      { label: "音のセンスが唯一無二", from: "@dj_kuro" },
      { label: "聞き上手", from: "@miho" },
    ],
    negatives: [
      { label: "遅刻癖あり (要注意)", from: "Live Crew" },
      { label: "締切に弱い", from: "@kenji_sato" },
    ],
    trust: 71,
    reliability: 58,
    contribution: 84,
  },
  {
    id: "p_003",
    name: "Riley Chen",
    handle: "@riley_dev",
    initials: "RC",
    defaultFace: "work",
    city: "Singapore",
    tags: ["Engineer", "AI", "Infra"],
    meta: {
      metAt: "2026-04-29 14:02",
      place: "TechBridge SG",
      via: "NFC Tap",
    },
    positives: [
      { label: "技術的に圧倒的", from: "@infra_jp" },
      { label: "ドキュメントが綺麗", from: "@team_oss" },
      { label: "オンコール対応が神", from: "Cloud Dragon" },
    ],
    negatives: [],
    trust: 94,
    reliability: 96,
    contribution: 88,
  },
  {
    id: "p_004",
    name: "高田 美玲",
    handle: "@miley",
    initials: "MT",
    defaultFace: "community",
    city: "Osaka",
    tags: ["Community", "Event", "Mentor"],
    meta: {
      metAt: "2026-04-22 17:48",
      place: "梅田 Garage",
      via: "NFC Tap",
    },
    positives: [
      { label: "場を作る天才", from: "@kenji_sato" },
      { label: "学生の悩みに親身", from: "Fight Club" },
    ],
    negatives: [
      { label: "オーバーコミット気味", from: "@org_lead" },
    ],
    trust: 86,
    reliability: 79,
    contribution: 93,
  },
  {
    id: "p_005",
    name: "Mei Yamashita",
    handle: "@mei.y",
    initials: "MY",
    defaultFace: "student",
    city: "Fukuoka",
    tags: ["HCI", "Researcher", "Master"],
    meta: {
      metAt: "2026-04-15 11:35",
      place: "九大 イーストプラザ",
      via: "NFC Tap",
    },
    positives: [
      { label: "リサーチが鋭い", from: "@prof_h" },
      { label: "図解が分かりやすい", from: "@kenji_sato" },
    ],
    negatives: [
      { label: "発表が緊張しがち", from: "Lab" },
    ],
    trust: 82,
    reliability: 88,
    contribution: 74,
  },
  {
    id: "p_006",
    name: "蓮 / Ren",
    handle: "@ren_03",
    initials: "RE",
    defaultFace: "creator",
    city: "Tokyo",
    tags: ["Photographer", "Visual", "Editor"],
    meta: {
      metAt: "2026-04-10 20:00",
      place: "代々木 Studio",
      via: "NFC Tap",
    },
    positives: [
      { label: "現場対応力が高い", from: "@art_dir" },
    ],
    negatives: [
      { label: "完成までブラックボックス", from: "@client_a" },
    ],
    trust: 76,
    reliability: 71,
    contribution: 80,
  },
];

export interface Recommendation {
  personId: string;
  reason: string;
  via: string;
  score: number;
}

export const recommendations: Recommendation[] = [
  {
    personId: "p_003",
    reason: "Cloud Dragonと相互フォロー、Infraが共通テーマ",
    via: "佐藤健司さん経由",
    score: 0.92,
  },
  {
    personId: "p_005",
    reason: "HCI研究 × NFC領域でリサーチが重なる",
    via: "Mei Yamashita研究室",
    score: 0.88,
  },
  {
    personId: "p_004",
    reason: "次回のFight Clubで登壇予定。コミュニティ運営者",
    via: "Fight Club Osaka",
    score: 0.83,
  },
];

export interface EventLog {
  id: string;
  date: string;
  title: string;
  participants: number;
  taps: number;
  city: string;
}

export const events: EventLog[] = [
  { id: "e_06", date: "2026-05-22", title: "Cloud Dragon Pitch Night", participants: 48, taps: 132, city: "Tokyo" },
  { id: "e_05", date: "2026-05-12", title: "Fight Club #014", participants: 32, taps: 86, city: "Tokyo" },
  { id: "e_04", date: "2026-04-29", title: "TechBridge SG Mixer", participants: 64, taps: 178, city: "Singapore" },
  { id: "e_03", date: "2026-04-22", title: "梅田 Garage Day", participants: 28, taps: 71, city: "Osaka" },
  { id: "e_02", date: "2026-04-15", title: "九大 HCI Meetup", participants: 22, taps: 54, city: "Fukuoka" },
];
