// داده‌های اولیه با ساختار نسخه نمایشی HTML هم‌راستا شده‌اند.
// این داده‌ها seed محلی هستند و جایگزین API یا پایگاه داده عملیاتی نیستند.
export const stores = [
  {
    id: "home",
    name: "خانه‌آرا",
    icon: "🛋️",
    subtitle: "مبلمان و لوازم خانه",
    description: "روش خرید نقدی یا پرداخت بخشی از مبلغ به‌صورت نقد و باقی با چک یا وثیقه طلا.",
    minDown: 25,
    plans: { 3: 4, 6: 8, 12: 16, 18: 25 },
    methods: {
      own: { enabled: true, minDown: 30, minGrade: "C", chequeColors: ["white", "yellow"], maxFinancing: 110000000, months: [3, 6, 12], note: "چک صیادی و بررسی رتبه اعتباری خریدار؛ تصمیم نهایی با فروشگاه." },
      gold: { enabled: true, minDown: 10, minGrade: "", chequeColors: [], maxFinancing: 160000000, months: [6, 12, 18], coverage: 65, note: "وثیقه طلا پس از کارشناسی حضوری و رسید امانت بررسی می‌شود." },
      bank: { enabled: false, minDown: 25, minGrade: "C", chequeColors: [], maxFinancing: 120000000, months: [6, 12], note: "" },
      cheque: { enabled: false, minDown: 40, minGrade: "", chequeColors: ["white"], maxFinancing: 90000000, months: [3, 6], note: "" },
    },
  },
  {
    id: "digital",
    name: "دیجی‌مارکت",
    icon: "💻",
    subtitle: "موبایل و کالای دیجیتال",
    description: "امکان خرید نقدی یا اقساطی از مسیر معرفی به بانک و استعلام وضعیت چک.",
    minDown: 20,
    plans: { 3: 3, 6: 7, 12: 14, 18: 21 },
    methods: {
      bank: { enabled: true, minDown: 25, minGrade: "B", chequeColors: [], maxFinancing: 120000000, months: [6, 12, 18], note: "رتبه A یا B برای تشکیل پرونده؛ تأیید نهایی به عهده بانک است." },
      cheque: { enabled: true, minDown: 40, minGrade: "", chequeColors: ["white", "yellow"], maxFinancing: 75000000, months: [3, 6], note: "بررسی رنگ وضعیت چک، بدون الزام به استعلام رتبه بانکی." },
      own: { enabled: false, minDown: 35, minGrade: "B", chequeColors: ["white"], maxFinancing: 80000000, months: [3, 6, 12], note: "" },
      gold: { enabled: false, minDown: 15, minGrade: "", chequeColors: [], maxFinancing: 100000000, months: [6, 12], coverage: 65, note: "" },
    },
  },
];

export const products = [
  { id: "p1", storeId: "home", name: "مبل راحتی هفت نفره آوید", category: "مبلمان", price: 68000000, stock: 4, art: "sofa", icon: "🛋️", tag: "پرفروش", description: "مبل راحتی با پارچه قابل شستشو و طراحی مدرن.", specs: { "تعداد نشیمن": "۷ نفر", رنگ: "کرم روشن", "جنس بدنه": "چوب روس", گارانتی: "۱۸ ماه فروشگاه" } },
  { id: "p2", storeId: "digital", name: "لپ‌تاپ ۱۵ اینچی NovaBook Pro", category: "کالای دیجیتال", price: 73500000, stock: 5, art: "laptop", icon: "💻", tag: "پیشنهاد ویژه", description: "لپ‌تاپ برای کار و تحصیل با سخت‌افزار مناسب.", specs: { نمایشگر: "۱۵.۶ اینچ", "حافظه رم": "۱۶ گیگابایت", SSD: "۵۱۲ گیگابایت" } },
  { id: "p3", storeId: "home", name: "یخچال فریزر دوقلو برفین", category: "لوازم خانگی", price: 48000000, stock: 7, art: "fridge", icon: "🧊", tag: "تحویل سریع", description: "یخچال فریزر جادار و کم‌مصرف.", specs: { نوع: "فریزر بالا", گنجایش: "۲۸ فوت", رنگ: "نقره‌ای" } },
  { id: "p4", storeId: "digital", name: "گوشی هوشمند Vertex S24", category: "کالای دیجیتال", price: 28900000, stock: 12, art: "phone", icon: "📱", tag: "محبوب", description: "گوشی خوش‌دست با نمایشگر بزرگ و باتری مناسب.", specs: { حافظه: "۲۵۶ گیگابایت", باتری: "۵۰۰۰ میلی‌آمپر", نمایشگر: "۶.۵ اینچ" } },
  { id: "p5", storeId: "home", name: "ماشین لباسشویی ۹ کیلویی اُپال", category: "لوازم خانگی", price: 32900000, stock: 9, art: "washer", icon: "🧺", tag: "اقتصادی", description: "با برنامه‌های شست‌وشوی متنوع و مصرف بهینه.", specs: { ظرفیت: "۹ کیلوگرم", موتور: "۱۴۰۰ دور", رنگ: "سفید" } },
  { id: "p6", storeId: "digital", name: "تلویزیون هوشمند ۵۵ اینچ Vista", category: "کالای دیجیتال", price: 47700000, stock: 6, art: "tv", icon: "📺", tag: "جدید", description: "تلویزیون هوشمند 4K با طراحی باریک.", specs: { اندازه: "۵۵ اینچ", "کیفیت تصویر": "4K", پنل: "LED" } },
  { id: "p7", storeId: "home", name: "جاروبرقی کیسه‌ای آریو", category: "لوازم خانگی", price: 11500000, stock: 8, art: "vacuum", icon: "🧹", tag: "قیمت مناسب", description: "سبک و مناسب کارهای روزانه خانه.", specs: { توان: "۲۲۰۰ وات", گنجایش: "۴ لیتر", گارانتی: "۱۲ ماه" } },
  { id: "p8", storeId: "digital", name: "هدفون بی‌سیم Soundly Max", category: "کالای دیجیتال", price: 9800000, stock: 15, art: "headphones", icon: "🎧", tag: "پیشنهاد ویژه", description: "هدفون سبک با اتصال بلوتوث و صدای شفاف.", specs: { اتصال: "بلوتوث", شارژدهی: "۳۰ ساعت", رنگ: "مشکی" } },
];
