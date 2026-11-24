import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { products, stores } from "../../../data/demoData.js";
import Container from "../../../components/shared/Container.jsx";

const money = (value = 0) => new Intl.NumberFormat("fa-IR").format(Number(value) || 0) + " تومان";
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const cartKey = "ghestyar.cart";
const orderKey = "ghestyar.orders";
const Field = ({ label, ...props }) => <label className="ws-field"><span>{label}</span><input {...props} /></label>;
const SelectField = ({ label, children, ...props }) => <label className="ws-field"><span>{label}</span><select {...props}>{children}</select></label>;
const Panel = ({ title, subtitle, children, action }) => <section className="ws-panel"><div className="ws-panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>;
const Status = ({ children, tone = "info" }) => <span className={`ws-status ws-status--${tone}`}>{children}</span>;

function WorkspacePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useState(() => read(cartKey, []));
  const [orders, setOrders] = useState(() => read(orderKey, []));
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState(50000000);
  const [months, setMonths] = useState(12);
  const [downPercent, setDownPercent] = useState(30);
  const path = location.pathname;
  const inCart = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const product = products.find((item) => item.id === params.orderId || item.id === params.productId);
  const store = stores.find((item) => item.id === params.storeId);
  const filteredProducts = useMemo(() => products.filter((item) => item.name.includes(query) || item.category.includes(query)), [query]);
  const updateCart = (next) => { setCart(next); write(cartKey, next); };
  const addToCart = (item) => {
    const current = read(cartKey, []);
    if (current.length && !current.some((row) => row.storeId === item.storeId)) { setNotice("هر سفارش فقط می‌تواند شامل محصولات یک فروشگاه باشد. سبد فعلی را ابتدا نهایی کنید یا خالی کنید."); return; }
    const found = current.find((row) => row.id === item.id);
    const next = found ? current.map((row) => row.id === item.id ? { ...row, qty: row.qty + 1 } : row) : [...current, { id: item.id, name: item.name, price: item.price, qty: 1, storeId: item.storeId }];
    updateCart(next); setNotice("محصول به سبد خرید اضافه شد.");
  };
  const submitOrder = (event) => {
    event.preventDefault();
    if (!cart.length) return;
    const form = new FormData(event.currentTarget);
    const order = { id: "GH-" + Date.now().toString().slice(-8), createdAt: new Date().toISOString(), status: "در انتظار بررسی", name: form.get("name"), phone: form.get("phone"), address: form.get("address"), items: cart, total };
    const next = [order, ...orders]; setOrders(next); write(orderKey, next); updateCart([]); navigate("/order/" + order.id);
  };
  const titleMap = [
    ["/cart", "سبد خرید"], ["/checkout", "تکمیل سفارش"], ["/orders", "سفارش‌های من"], ["/account", "حساب کاربری"],
    ["/login", "ورود و ثبت‌نام"], ["/inquiry", "استعلام اعتبار و چک"], ["/my-inquiries", "سوابق استعلام"],
    ["/match", "بررسی شرایط خرید من"], ["/compare", "مقایسه شرایط پرداخت"], ["/eligibility", "بررسی شرایط خرید"],
    ["/identity", "احراز هویت"], ["/credit-details", "جزئیات اعتبار"], ["/increase-credit", "درخواست افزایش اعتبار"],
    ["/roles-audit", "گزارش فعالیت و دسترسی‌ها"],
  ];
  const title = titleMap.find(([prefix]) => path === prefix)?.[1]
    || (path.startsWith("/merchant") ? "پنل فروشنده" : path.startsWith("/admin") ? "پنل مدیریت" : path.startsWith("/shop-site") ? "وب‌سایت اختصاصی فروشگاه" : path.startsWith("/tracking") ? "پیگیری سفارش" : path.startsWith("/invoice") ? "فاکتور سفارش" : path.startsWith("/order") ? "جزئیات سفارش" : "مرکز خدمات قسط‌یار");
  const installment = Math.max(0, (Number(amount) * (1 - Number(downPercent) / 100)) * (1 + Number(months) * 0.012)) / Number(months);
  const sidebar = path.startsWith("/merchant")
    ? [["/merchant", "نمای کلی"], ["/merchant/products", "مدیریت محصولات"], ["/merchant/orders", "سفارش‌ها"], ["/merchant/inquiries", "درخواست‌های اعتبار"], ["/merchant/plans", "شرایط اقساط"], ["/merchant/theme", "طراحی سایت فروشگاه"], ["/merchant/settings", "تنظیمات فروشگاه"]]
    : [["/admin", "نمای کلی"], ["/admin/users", "کاربران"], ["/admin/stores", "فروشگاه‌ها"], ["/admin/products", "محصولات"], ["/admin/orders", "سفارش‌ها"], ["/admin/inquiries", "استعلام‌ها"], ["/admin/reports", "گزارش‌ها"], ["/admin/settings", "تنظیمات سامانه"]];

  const heading = <div className="ws-heading"><div><span className="eyebrow">پنل خدمات قسط‌یار</span><h1>{title}</h1><p>اطلاعات و درخواست‌های خود را در یک محیط یکپارچه مدیریت کنید.</p></div><Link className="button button--secondary" to="/">بازگشت به فروشگاه</Link></div>;
  const renderCart = () => <><Panel title="اقلام انتخاب‌شده" subtitle="در این نسخه، سبد خرید در مرورگر شما نگهداری می‌شود.">{cart.length ? <div className="ws-table-wrap"><table className="ws-table"><thead><tr><th>محصول</th><th>قیمت واحد</th><th>تعداد</th><th>جمع</th><th>عملیات</th></tr></thead><tbody>{cart.map((item) => <tr key={item.id}><td>{item.name}</td><td>{money(item.price)}</td><td><div className="ws-qty"><button onClick={() => updateCart(cart.map((x) => x.id === item.id ? {...x, qty: Math.max(1, x.qty - 1)} : x))}>−</button>{item.qty}<button onClick={() => updateCart(cart.map((x) => x.id === item.id ? {...x, qty: x.qty + 1} : x))}>+</button></div></td><td>{money(item.price * item.qty)}</td><td><button className="ws-link" onClick={() => updateCart(cart.filter((x) => x.id !== item.id))}>حذف</button></td></tr>)}</tbody></table></div> : <div className="ws-empty">سبد خرید شما خالی است. <Link to="/catalog">مشاهده محصولات</Link></div>}</Panel>{cart.length > 0 && <div className="ws-total"><strong>مبلغ کل: {money(total)}</strong><Link className="button button--primary" to="/checkout">ادامه و ثبت سفارش</Link></div>}</>;
  const renderCheckout = () => <div className="ws-two-col"><Panel title="اطلاعات تحویل" subtitle="اطلاعات تماس و نشانی را وارد کنید."><form className="ws-form" onSubmit={submitOrder}><Field label="نام و نام خانوادگی" name="name" required placeholder="نام خریدار" /><Field label="شماره همراه" name="phone" required pattern="09[0-9]{9}" placeholder="09xxxxxxxxx" /><label className="ws-field"><span>نشانی کامل</span><textarea name="address" required rows="3" placeholder="استان، شهر، خیابان و پلاک" /></label><button className="button button--primary" disabled={!cart.length}>ثبت سفارش آزمایشی</button></form></Panel><Panel title="خلاصه سفارش">{cart.map((item) => <div className="ws-list-row" key={item.id}><span>{item.name} × {item.qty}</span><strong>{money(item.price * item.qty)}</strong></div>)}<div className="ws-total-line"><strong>جمع کل</strong><strong>{money(total)}</strong></div><p className="ws-hint">ثبت سفارش در این نسخه آزمایشی است و به درگاه پرداخت یا سیستم انبار متصل نیست.</p></Panel></div>;
  const renderOrders = () => <Panel title="فهرست سفارش‌ها" subtitle="سفارش‌های ثبت‌شده روی همین مرورگر.">{orders.length ? <div className="ws-table-wrap"><table className="ws-table"><thead><tr><th>کد سفارش</th><th>تاریخ</th><th>مبلغ</th><th>وضعیت</th><th>جزئیات</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</td><td>{money(order.total)}</td><td><Status tone="warning">{order.status}</Status></td><td><Link to={"/order/" + order.id}>مشاهده</Link></td></tr>)}</tbody></table></div> : <div className="ws-empty">هنوز سفارشی ثبت نکرده‌اید.</div>}</Panel>;
  const renderCalculator = () => <Panel title="محاسبه و مقایسه اقساط" subtitle="مقادیر را تغییر دهید تا برآورد پرداخت ماهانه به‌روزرسانی شود."><div className="ws-calc-grid"><Field label="مبلغ کالا (تومان)" type="number" min="100000" value={amount} onChange={(e) => setAmount(e.target.value)} /><SelectField label="تعداد ماه" value={months} onChange={(e) => setMonths(Number(e.target.value))}>{[3,6,12,18,24].map((n) => <option key={n} value={n}>{n} ماه</option>)}</SelectField><Field label="پیش‌پرداخت (درصد)" type="number" min="0" max="90" value={downPercent} onChange={(e) => setDownPercent(Math.min(90, Math.max(0, Number(e.target.value))))} /></div><div className="ws-metrics"><div><span>پیش‌پرداخت</span><strong>{money(amount * downPercent / 100)}</strong></div><div><span>مانده قابل پرداخت</span><strong>{money(amount * (1 - downPercent / 100))}</strong></div><div><span>قسط ماهانه تخمینی</span><strong>{money(installment)}</strong></div><div><span>تعداد اقساط</span><strong>{new Intl.NumberFormat("fa-IR").format(months)} ماه</strong></div></div><p className="ws-hint">این محاسبه صرفاً برآورد نمونه با نرخ فرضی است؛ مبلغ و شرایط قطعی را فروشگاه یا تأمین‌کننده اعتبار تعیین می‌کند.</p></Panel>;
  const renderAuth = () => <Panel title="ورود یا ایجاد حساب" subtitle="برای نسخه نمایشی، اطلاعات فقط در فرم دریافت می‌شوند و احراز هویت واقعی انجام نمی‌شود."><form className="ws-form ws-form--narrow" onSubmit={(e) => {e.preventDefault(); setNotice("فرم ورود آزمایشی ثبت شد؛ برای ورود واقعی باید سرویس احراز هویت متصل شود.");}}><Field label="شماره همراه" name="phone" required pattern="09[0-9]{9}" placeholder="09xxxxxxxxx" /><Field label="رمز یک‌بارمصرف" name="otp" required minLength="4" maxLength="8" placeholder="کد آزمایشی" /><button className="button button--primary">ادامه</button></form></Panel>;
  const renderInquiry = () => <div className="ws-two-col"><Panel title="ثبت درخواست استعلام" subtitle="فرم نمایشی برای جمع‌آوری اطلاعات اولیه."><form className="ws-form" onSubmit={(e) => {e.preventDefault(); setNotice("درخواست آزمایشی ثبت شد. نتیجه استعلام واقعی در این نسخه دریافت نمی‌شود.");}}><Field label="نام و نام خانوادگی" required placeholder="نام کامل" /><Field label="کد ملی" required minLength="10" maxLength="10" pattern="[0-9]{10}" placeholder="۱۰ رقم" /><Field label="شماره همراه" required pattern="09[0-9]{9}" placeholder="09xxxxxxxxx" /><SelectField label="نوع استعلام"><option>اعتبارسنجی</option><option>وضعیت چک</option><option>بررسی شرایط خرید</option></SelectField><button className="button button--primary">ثبت درخواست</button></form></Panel><Panel title="پیش از ثبت درخواست"><ul className="ws-bullets"><li>اطلاعات هویتی باید متعلق به متقاضی باشد.</li><li>ثبت فرم به معنی تأیید اعتبار نیست.</li><li>اتصال به سرویس‌های رسمی نیازمند بک‌اند امن و مجوز دسترسی است.</li></ul></Panel></div>;
  const renderAccount = () => <><div className="ws-metrics"><div><span>سفارش‌های ثبت‌شده</span><strong>{orders.length}</strong></div><div><span>اقلام سبد خرید</span><strong>{inCart}</strong></div><div><span>مجموع خرید آزمایشی</span><strong>{money(orders.reduce((s,o)=>s+o.total,0))}</strong></div></div><div className="ws-shortcuts">{[["/orders","سفارش‌های من"],["/inquiry","استعلام اعتبار"],["/credit-details","اعتبار من"],["/identity","احراز هویت"],["/increase-credit","افزایش اعتبار"],["/cart","سبد خرید"]].map(([url,label])=><Link className="ws-shortcut" key={url} to={url}>{label}<span>←</span></Link>)}</div></>;
  const renderStoreList = () => <Panel title="فروشگاه‌های قسط‌یار" subtitle="فروشگاه‌های نمونه موجود در داده‌های محلی."><div className="ws-cards">{stores.map((s)=><article className="ws-card" key={s.id}><span className="ws-card-icon">{s.icon}</span><h3>{s.name}</h3><p>{s.subtitle}</p><Link to={"/store/"+s.id}>مشاهده فروشگاه</Link></article>)}</div></Panel>;
  const renderCatalog = () => <Panel title="محصولات" subtitle="جستجو در محصولات نمونه."><Field label="جستجوی محصول" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="نام یا دسته‌بندی محصول" /><div className="ws-cards">{filteredProducts.map((item)=><article className="ws-card" key={item.id}><span className="ws-card-icon">{item.icon}</span><h3>{item.name}</h3><p>{money(item.price)}</p><div className="ws-card-actions"><Link to={"/product/"+item.id}>جزئیات</Link><button className="ws-link" onClick={()=>addToCart(item)}>افزودن به سبد</button></div></article>)}</div></Panel>;
  const renderDashboard = (admin = false) => <><div className="ws-metrics">{(admin ? [["کاربران نمونه","۱۲۸"],["فروشگاه‌ها",stores.length],["محصولات",products.length],["سفارش‌های ثبت‌شده",orders.length]] : [["بازدید صفحه","۲٬۴۸۰"],["محصولات فعال",products.length],["سفارش‌ها",orders.length],["درخواست‌های جدید","۳"]]).map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="ws-shortcuts">{sidebar.slice(1).map(([url,label])=><Link className="ws-shortcut" key={url} to={url}>{label}<span>←</span></Link>)}</div><Panel title={admin ? "آخرین رویدادهای سامانه" : "فعالیت‌های اخیر"}><div className="ws-empty">داده‌های این داشبورد نمونه هستند. پس از اتصال API، اطلاعات واقعی در این بخش نمایش داده می‌شود.</div></Panel></>;
  const renderGenericForm = (headingText, description) => <Panel title={headingText} subtitle={description}><form className="ws-form ws-form--narrow" onSubmit={(e)=>{e.preventDefault();setNotice("اطلاعات فرم به‌صورت آزمایشی ثبت شد.");}}><Field label="عنوان درخواست" required placeholder="عنوان را وارد کنید" /><Field label="مبلغ (تومان)" type="number" min="0" placeholder="مبلغ موردنظر" /><label className="ws-field"><span>توضیحات</span><textarea rows="4" required placeholder="توضیحات تکمیلی" /></label><button className="button button--primary">ثبت اطلاعات</button></form></Panel>;

  let body;
  if (path === "/cart") body = renderCart();
  else if (path === "/checkout") body = renderCheckout();
  else if (path === "/orders") body = renderOrders();
  else if (path === "/login") body = renderAuth();
  else if (path === "/inquiry") body = renderInquiry();
  else if (path === "/my-inquiries") body = <Panel title="سوابق استعلام"><div className="ws-empty">درخواست ثبت‌شده‌ای در این مرورگر وجود ندارد. <Link to="/inquiry">ثبت استعلام جدید</Link></div></Panel>;
  else if (path === "/account") body = renderAccount();
  else if (path === "/match" || path === "/compare" || path === "/eligibility") body = renderCalculator();
  else if (path === "/identity") body = <Panel title="تکمیل اطلاعات هویتی" subtitle="این فرم صرفاً رابط کاربری اولیه است. مدارک حساس را در نسخه نمایشی وارد نکنید."><form className="ws-form ws-form--narrow" onSubmit={(e)=>{e.preventDefault();setNotice("فرم هویتی آزمایشی تکمیل شد؛ هیچ مدرکی ارسال نشده است.");}}><Field label="نام و نام خانوادگی" required /><Field label="کد ملی" minLength="10" maxLength="10" /><Field label="تاریخ تولد" type="date" /><Field label="شماره همراه" pattern="09[0-9]{9}" /><button className="button button--primary">ذخیره پیش‌نویس</button></form></Panel>;
  else if (path === "/credit-details") body = <><div className="ws-metrics"><div><span>سقف اعتبار نمایشی</span><strong>۵۰ میلیون تومان</strong></div><div><span>اعتبار مصرف‌شده</span><strong>۰ تومان</strong></div><div><span>اعتبار باقی‌مانده</span><strong>۵۰ میلیون تومان</strong></div></div><Panel title="جزئیات اعتبار"><p className="ws-hint">این اعداد نمونه هستند و از هیچ سرویس اعتبارسنجی دریافت نشده‌اند.</p><Link className="button button--primary" to="/increase-credit">درخواست افزایش اعتبار</Link></Panel></>;
  else if (path === "/increase-credit") body = renderGenericForm("درخواست افزایش سقف اعتبار","درخواست پس از بررسی مدارک و شرایط توسط مرجع مربوطه قابل تصمیم‌گیری است.");
  else if (path === "/roles-audit") body = <Panel title="گزارش دسترسی و فعالیت"><div className="ws-empty">گزارش واقعی فقط پس از پیاده‌سازی ثبت رویدادها در سرور قابل نمایش است.</div></Panel>;
  else if (path.startsWith("/merchant") || path.startsWith("/admin")) body = <div className="ws-dashboard"><aside className="ws-sidebar"><strong>{path.startsWith("/admin") ? "مدیریت سامانه" : "مدیریت فروشگاه"}</strong>{sidebar.map(([url,label])=><Link className={path===url ? "is-active" : ""} to={url} key={url}>{label}</Link>)}</aside><div className="ws-dashboard-main">{path === "/merchant" || path === "/admin" ? renderDashboard(path.startsWith("/admin")) : path.endsWith("/products") || path.endsWith("/stores") ? renderCatalog() : path.endsWith("/orders") ? renderOrders() : path.endsWith("/inquiries") ? renderInquiry() : path.endsWith("/theme") ? <Panel title="سفارشی‌سازی وب‌سایت فروشگاه" subtitle="پیش‌نمایش اولیه ویرایش هویت فروشگاه."><Field label="نام فروشگاه" defaultValue={store?.name || "فروشگاه من"} /><Field label="شعار فروشگاه" placeholder="شعار کوتاه برند" /><SelectField label="قالب"><option>مینیمال روشن</option><option>کلاسیک</option><option>مدرن</option></SelectField><Status tone="warning">ذخیره و انتشار واقعی به سرور متصل نیست.</Status></Panel> : renderGenericForm("تنظیمات و اطلاعات پایه","اطلاعات نمایشی پنل را تکمیل کنید.")}</div></div>;
  else if (path.startsWith("/shop-site")) body = <Panel title={store?.name || "فروشگاه نمونه"} subtitle="پیش‌نمایش وب‌سایت اختصاصی فروشگاه"><div className="ws-cards">{products.filter((p)=>!store || p.storeId===store.id).map((p)=><article className="ws-card" key={p.id}><span className="ws-card-icon">{p.icon}</span><h3>{p.name}</h3><p>{money(p.price)}</p><Link to={"/product/"+p.id}>مشاهده محصول</Link></article>)}</div></Panel>;
  else if (path.startsWith("/order/")) { const order = orders.find((o)=>o.id===params.orderId); body = <Panel title={order ? "سفارش "+order.id : "سفارش پیدا نشد"}>{order ? <><Status tone="warning">{order.status}</Status><p>خریدار: {order.name}</p><p>شماره تماس: {order.phone}</p><p>نشانی: {order.address}</p><p>مبلغ: {money(order.total)}</p><Link to={"/tracking/"+order.id}>پیگیری سفارش</Link></> : <div className="ws-empty">سفارش در داده‌های محلی این مرورگر پیدا نشد.</div>}</Panel>; }
  else if (path.startsWith("/tracking/")) body = <Panel title="وضعیت پیگیری"><Status tone="warning">در انتظار بررسی فروشگاه</Status><p>کد پیگیری: {params.orderId}</p><p className="ws-hint">وضعیت سفارش در نسخه نمایشی از جریان عملیاتی حمل‌ونقل دریافت نمی‌شود.</p></Panel>;
  else if (path.startsWith("/invoice/")) body = <Panel title="فاکتور سفارش"><p>شناسه: {params.orderId}</p><p className="ws-hint">فاکتور رسمی پس از اتصال سیستم سفارش و مالی صادر خواهد شد.</p><button className="button button--secondary" onClick={()=>window.print()}>چاپ این صفحه</button></Panel>;
  else if (path === "/stores") body = renderStoreList();
  else if (path === "/catalog") body = renderCatalog();
  else if (path.startsWith("/product/")) body = product ? <div className="ws-two-col"><Panel title={product.name}><span className="ws-card-icon">{product.icon}</span><h2>{money(product.price)}</h2><p>{product.description}</p><p>موجودی نمایشی: {product.stock} عدد</p><button className="button button--primary" onClick={()=>addToCart(product)}>افزودن به سبد خرید</button></Panel><Panel title="محاسبه شرایط پرداخت">{renderCalculator()}</Panel></div> : <div className="ws-empty">محصول پیدا نشد.</div>;
  else if (path.startsWith("/store/")) body = store ? <Panel title={store.name} subtitle={store.subtitle}><p>{store.description}</p><p>حداقل پیش‌پرداخت: {store.minDown}٪</p><div className="ws-cards">{products.filter((p)=>p.storeId===store.id).map((p)=><article className="ws-card" key={p.id}><span className="ws-card-icon">{p.icon}</span><h3>{p.name}</h3><p>{money(p.price)}</p><Link to={"/product/"+p.id}>جزئیات محصول</Link></article>)}</div></Panel> : <div className="ws-empty">فروشگاه پیدا نشد.</div>;
  else body = <Panel title={title}><div className="ws-empty">این بخش آماده توسعه است.</div></Panel>;

  return <Container className="page-section ws-page">{heading}{notice && <div className="ws-notice" role="status">{notice}<button onClick={()=>setNotice("")}>×</button></div>}{body}</Container>;
}
export default WorkspacePage;
