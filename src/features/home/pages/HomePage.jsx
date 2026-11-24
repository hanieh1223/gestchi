import { Link } from "react-router-dom";
import Container from "../../../components/shared/Container.jsx";
import SectionHeading from "../../../components/shared/SectionHeading.jsx";
import StoreCard from "../../../components/shared/StoreCard.jsx";
import ProductCard from "../../../components/shared/ProductCard.jsx";
import { products, stores } from "../../../data/demoData.js";

function HomePage() {
  const storeById = Object.fromEntries(stores.map((store) => [store.id, store]));

  return (
    <Container>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">قسط‌یار؛ همراه خرید هوشمندانه</span>
          <h1>خرید آسان، <em>پرداخت منعطف</em></h1>
          <p>محصولات فروشگاه‌ها را ببین، شرایط اقساط را مقایسه کن و متناسب با بودجه‌ات خرید کن.</p>
          <div className="hero-actions">
            <Link className="button button--accent button--large" to="/catalog">شروع خرید اقساطی</Link>
            <Link className="button button--outline button--large" to="/stores">مشاهده فروشگاه‌ها</Link>
            <Link className="button button--outline button--large" to="/catalog">مشاهده کالاها</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="hero-device"><span>ق</span><strong>خرید هوشمندانه</strong><small>پرداخت متناسب با بودجه شما</small><div className="hero-device__bar" /></div>
          <span className="hero-float hero-float--top">✓ شرایط شفاف</span>
          <span className="hero-float hero-float--bottom">٪ پرداخت منعطف</span>
        </div>
      </section>

      <section className="benefit-row" aria-label="مزیت‌های قسط‌یار">
        <div className="benefit"><span>💳</span>خرید نقدی و ترکیبی</div>
        <div className="benefit"><span>🧮</span>محاسبه مبلغ هر قسط</div>
        <div className="benefit"><span>🛍️</span>شرایط اختصاصی هر فروشگاه</div>
      </section>

      <section className="content-section">
        <SectionHeading title="فروشگاه‌ها" description="روش‌های فروش یکسان نیستند؛ مناسب‌ترین را انتخاب کن" action={<Link className="button button--secondary" to="/stores">همه فروشگاه‌ها</Link>} />
        <div className="store-grid">{stores.map((store) => <StoreCard key={store.id} store={store} />)}</div>
      </section>

      <section className="content-section">
        <SectionHeading title="کالاهای محبوب" description="قیمت نقدی و شرایط خرید را پیش از سفارش بررسی کن" action={<Link className="button button--secondary" to="/catalog">همه کالاها</Link>} />
        <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} storeName={storeById[product.storeId]?.name ?? "فروشگاه"} />)}</div>
      </section>

      <section className="match-banner">
        <div><span className="eyebrow">با چند پاسخ کوتاه</span><h2>کدام فروشگاه با توان پرداخت تو سازگارتر است؟</h2><p>مبلغی که می‌توانی نقد بدهی و قسط ماهانه دلخواه را مشخص کن.</p></div>
        <Link className="button button--primary button--large" to="/catalog">پیدا کردن فروشگاه مناسب</Link>
      </section>
    </Container>
  );
}

export default HomePage;
