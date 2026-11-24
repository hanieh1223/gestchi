import { Link, useParams } from "react-router-dom";
import Container from "../../../components/shared/Container.jsx";
import ProductCard from "../../../components/shared/ProductCard.jsx";
import SectionHeading from "../../../components/shared/SectionHeading.jsx";
import { products, stores } from "../../../data/demoData.js";

function StoreDetailPage() {
  const { storeId } = useParams();
  const store = stores.find((item) => item.id === storeId);
  if (!store) return <Container className="page-section"><section className="empty-state"><h1>فروشگاه پیدا نشد</h1><Link className="button button--primary" to="/stores">بازگشت به فروشگاه‌ها</Link></section></Container>;

  const storeProducts = products.filter((product) => product.storeId === store.id);
  const methods = Object.entries(store.methods).filter(([, method]) => method.enabled);

  return (
    <Container className="page-section">
      <section className="store-detail-hero">
        <span className="store-icon" aria-hidden="true">{store.icon}</span>
        <div><span className="eyebrow">فروشگاه عضو قسط‌یار</span><h1>{store.name}</h1><p>{store.description}</p></div>
      </section>
      <section className="surface-card store-terms">
        <h2>روش‌های خرید فعال</h2>
        <div className="tag-list">{methods.map(([id, method]) => <span className="tag" key={id}>{id === "own" ? "چک فروشگاه" : id === "gold" ? "وثیقه طلا" : id === "bank" ? "معرفی به بانک" : "چک صیادی"} · حداقل {method.minDown.toLocaleString("fa-IR")}٪ پیش‌پرداخت</span>)}</div>
        <p className="muted">شرایط نهایی پس از بررسی مدارک و تأیید فروشگاه یا مرجع اعتباردهنده مشخص می‌شود.</p>
      </section>
      <section className="content-section">
        <SectionHeading title="کالاهای این فروشگاه" description={`${storeProducts.length.toLocaleString("fa-IR")} کالا`} />
        <div className="product-grid">{storeProducts.map((product) => <ProductCard key={product.id} product={product} storeName={store.name} />)}</div>
      </section>
    </Container>
  );
}

export default StoreDetailPage;
