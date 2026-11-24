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
          <div><h3>خرید و محصولات</h3><Link to="/catalog">مشاهده همه محصولات</Link><Link to="/stores">فروشگاه‌های طرف قرارداد</Link><Link to="/cart">سبد خرید</Link><Link to="/match">بررسی شرایط خرید من</Link></div>
          <div><h3>خدمات مشتریان</h3><Link to="/inquiry">استعلام اعتبار و چک</Link><Link to="/credit-details">جزئیات اعتبار من</Link><Link to="/orders">سفارش‌ها و پیگیری</Link><Link to="/account">داشبورد و تراکنش‌ها</Link></div>
        </div>
        <div className="footer-bottom">© ۱۴۰۵ قسط‌یار · تمامی حقوق محفوظ است.</div>
      </Container>
    </footer>
  );
}

export default SiteFooter;
