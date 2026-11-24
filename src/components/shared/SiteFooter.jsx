import { Link } from "react-router-dom";
import Container from "./Container.jsx";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="footer-logo" to="/"><span className="brand-mark">ق</span><strong>قسط‌یار</strong></Link>
            <p>قسط‌یار بستری برای مشاهده فروشگاه‌ها، مقایسه شرایط خرید نقدی و اقساطی و پیگیری سفارش‌هاست.</p>
            <small>شرایط نهایی خرید اعتباری بر اساس بررسی فروشگاه یا مرجع ارائه‌دهنده اعتبار تعیین می‌شود.</small>
          </div>
          <div><h3>خرید و محصولات</h3><Link to="/catalog">مشاهده همه محصولات</Link><Link to="/stores">فروشگاه‌های طرف قرارداد</Link></div>
          <div><h3>راهنمای قسط‌یار</h3><Link to="/catalog">انتخاب کالا</Link><Link to="/stores">شرایط فروشگاه‌ها</Link></div>
        </div>
        <div className="footer-bottom">© تمامی حقوق این وب‌سایت محفوظ است.</div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
