import { Link, useLocation } from "react-router-dom";
import Container from "../../../components/shared/Container.jsx";

const moduleNames = {
  "/cart": "سبد خرید",
  "/checkout": "تکمیل سفارش",
  "/orders": "سفارش‌های من",
  "/account": "داشبورد مشتری",
  "/login": "ورود و ثبت‌نام",
  "/inquiry": "استعلام اعتبار و چک",
  "/my-inquiries": "سوابق استعلام",
  "/match": "بررسی شرایط خرید",
  "/compare": "مقایسه محصولات و روش‌های پرداخت",
  "/eligibility": "بررسی شرایط خرید از فروشگاه",
  "/identity": "احراز هویت",
  "/credit-details": "جزئیات اعتبار",
  "/increase-credit": "درخواست افزایش اعتبار",
  "/roles-audit": "نقش‌ها و گزارش فعالیت",
};

function ModulePlaceholderPage() {
  const { pathname } = useLocation();
  const title = moduleNames[pathname] ?? "جزئیات";
  return (
    <Container className="page-section">
      <section className="empty-state">
        <h1>{title}</h1>
        <p>این بخش در حال انتقال از نسخه اولیه به معماری React است.</p>
        <Link className="button button--primary" to="/">بازگشت به صفحه اصلی</Link>
      </section>
    </Container>
  );
}

export default ModulePlaceholderPage;
