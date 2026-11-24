import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../../components/shared/Container.jsx";
import { products, stores } from "../../../data/demoData.js";
import { calculateInstallmentQuote, getDefaultInstallmentQuote } from "../../installments/index.js";
import { formatCurrency } from "../../../utils/formatters.js";

function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const store = stores.find((item) => item.id === product?.storeId);
  const methods = Object.entries(store?.methods ?? {}).filter(([, method]) => method.enabled);
  const [methodId, setMethodId] = useState(methods[0]?.[0] ?? "");
  const method = store?.methods?.[methodId];
  const [months, setMonths] = useState(method?.months?.includes(6) ? 6 : method?.months?.[0] ?? 0);
  const [downPayment, setDownPayment] = useState(null);

  const quoteState = useMemo(() => {
    if (!product || !store || !method) return { quote: null, error: null };
    try {
      const quote = downPayment === null
        ? getDefaultInstallmentQuote(product.price, store, { id: methodId, ...method })
        : calculateInstallmentQuote({
            amount: product.price,
            store,
            method: { id: methodId, ...method },
            months,
            downPayment,
          });
      return { quote, error: null };
    } catch (error) {
      return { quote: null, error: error.message };
    }
  }, [product, store, method, methodId, months, downPayment]);

  if (!product || !store) {
    return <Container className="page-section"><section className="empty-state"><h1>کالا پیدا نشد</h1><Link className="button button--primary" to="/catalog">بازگشت به کالاها</Link></section></Container>;
  }

  function handleMethodChange(event) {
    const nextId = event.target.value;
    const nextMethod = store.methods[nextId];
    setMethodId(nextId);
    setMonths(nextMethod.months.includes(6) ? 6 : nextMethod.months[0]);
    setDownPayment(null);
  }

  return (
    <Container className="page-section">
      <p className="breadcrumb"><Link to="/">خانه</Link> / <Link to="/catalog">کالاها</Link> / {product.name}</p>
      <section className="detail-layout">
        <div className="surface-card product-detail-art"><span aria-hidden="true">{product.icon}</span></div>
        <div className="surface-card product-detail-info">
          <span className="eyebrow">{store.name} · {product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong className="product-price">{formatCurrency(product.price)}</strong>
          <p className="muted">موجودی نمایشی: {product.stock.toLocaleString("fa-IR")} عدد</p>
          <h2>مشخصات کالا</h2>
          <dl className="spec-list">{Object.entries(product.specs ?? {}).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </section>

      <section className="surface-card installment-panel">
        <h2>برآورد خرید اقساطی</h2>
        <p className="muted">این محاسبه بر اساس شرایط نمونه ثبت‌شده برای فروشگاه است و به‌معنای تأیید اعتبار یا تعهد فروش نیست.</p>
        {methods.length === 0 ? <p>این فروشگاه در حال حاضر روش اقساطی فعالی ندارد.</p> : (
          <div className="installment-controls">
            <label>روش پرداخت
              <select value={methodId} onChange={handleMethodChange}>
                {methods.map(([id]) => <option key={id} value={id}>{id === "own" ? "چک فروشگاه" : id === "gold" ? "وثیقه طلا" : id === "bank" ? "معرفی به بانک" : "چک صیادی"}</option>)}
              </select>
            </label>
            <label>تعداد اقساط
              <select value={months} onChange={(event) => setMonths(Number(event.target.value))}>
                {(method?.months ?? []).map((term) => <option key={term} value={term}>{term.toLocaleString("fa-IR")} ماه</option>)}
              </select>
            </label>
            <label>پیش‌پرداخت (تومان)
              <input type="number" min="0" max={product.price - 1} step="100000" value={downPayment ?? quoteState.quote?.downAmount ?? ""} onChange={(event) => setDownPayment(event.target.value === "" ? null : Number(event.target.value))} />
            </label>
          </div>
        )}
        {quoteState.error ? <p className="form-error" role="alert">{quoteState.error}</p> : null}
        {quoteState.quote ? <div className="quote-result">
          <div><span>پیش‌پرداخت</span><strong>{formatCurrency(quoteState.quote.downAmount)}</strong></div>
          <div><span>مبلغ هر قسط</span><strong>{formatCurrency(quoteState.quote.monthly)}</strong></div>
          <div><span>قسط آخر</span><strong>{formatCurrency(quoteState.quote.last)}</strong></div>
          <div><span>مجموع پرداخت</span><strong>{formatCurrency(quoteState.quote.total)}</strong></div>
          <p>{method.note}</p>
        </div> : null}
      </section>
    </Container>
  );
}

export default ProductDetailPage;
