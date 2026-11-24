import { Link } from "react-router-dom";

function StoreCard({ store }) {
  const methods = Object.entries(store.methods ?? {}).filter(([, method]) => method.enabled);

  return (
    <article className="surface-card store-card">
      <div className="store-card__heading">
        <span className="store-icon" aria-hidden="true">{store.icon}</span>
        <div><h3>{store.name}</h3><p>{store.subtitle}</p></div>
      </div>
      <p className="store-card__description">{store.description}</p>
      <div className="tag-list">
        {methods.map(([id]) => <span className="tag" key={id}>{id === "own" ? "چک فروشگاه" : id === "gold" ? "وثیقه طلا" : id === "bank" ? "معرفی به بانک" : "چک صیادی"}</span>)}
        <span className="tag">خرید نقدی</span>
      </div>
      <div className="store-card__actions">
        <Link className="button button--primary" to={`/store/${store.id}`}>ورود به فروشگاه</Link>
        <Link className="button button--secondary" to={`/eligibility?store=${store.id}`}>بررسی شرایط من</Link>
      </div>
    </article>
  );
}

export default StoreCard;
