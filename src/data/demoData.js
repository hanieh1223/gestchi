// داده‌های زیر صرفاً نمونه و هم‌راستا با فایل HTML اولیه هستند.
export const stores = [
  {
    id: "home",
    name: "خانه‌آرا",
    icon: "🛋️",
    subtitle: "مبلمان و لوازم خانه",
    description: "روش خرید نقدی یا پرداخت بخشی از مبلغ به‌صورت نقد و باقی با چک یا وثیقه طلا.",
    methods: ["چک فروشگاه", "وثیقه طلا"],
  },
  {
    id: "digital",
    name: "دیجی‌مارکت",
    icon: "💻",
    subtitle: "موبایل و کالای دیجیتال",
    description: "امکان خرید نقدی یا اقساطی از مسیر معرفی به بانک و استعلام وضعیت چک.",
    methods: ["معرفی به بانک", "چک صیادی"],
  },
];

export const products = [
  { id: "p1", storeId: "home", name: "مبل راحتی هفت نفره آوید", category: "مبلمان", price: 68000000, stock: 4, icon: "🛋️", tag: "پرفروش" },
  { id: "p2", storeId: "digital", name: "لپ‌تاپ ۱۵ اینچی NovaBook Pro", category: "کالای دیجیتال", price: 73500000, stock: 5, icon: "💻", tag: "پیشنهاد ویژه" },
  { id: "p3", storeId: "home", name: "یخچال فریزر دوقلو برفین", category: "لوازم خانگی", price: 48000000, stock: 7, icon: "🧊", tag: "تحویل سریع" },
  { id: "p4", storeId: "digital", name: "گوشی هوشمند Vertex S24", category: "کالای دیجیتال", price: 28900000, stock: 12, icon: "📱", tag: "محبوب" },
  { id: "p5", storeId: "home", name: "ماشین لباسشویی ۹ کیلویی اُپال", category: "لوازم خانگی", price: 32900000, stock: 9, icon: "🧺", tag: "اقتصادی" },
  { id: "p6", storeId: "digital", name: "تلویزیون هوشمند ۵۵ اینچ Vista", category: "کالای دیجیتال", price: 47700000, stock: 6, icon: "📺", tag: "جدید" },
  { id: "p7", storeId: "home", name: "جاروبرقی کیسه‌ای آریو", category: "لوازم خانگی", price: 11500000, stock: 8, icon: "🧹", tag: "قیمت مناسب" },
  { id: "p8", storeId: "digital", name: "هدفون بی‌سیم Soundly Max", category: "کالای دیجیتال", price: 9800000, stock: 15, icon: "🎧", tag: "پیشنهاد ویژه" },
];
