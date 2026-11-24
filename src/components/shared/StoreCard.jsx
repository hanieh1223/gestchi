import { Link } from "react-router-dom";

function StoreCard({ store }) {
  return (
    <article className="surface-card store-card">
      <div className="store-card__heading">
        <span className="store-icon" aria-hidden="true">{store.icon}</span>
        <div><h3>{store.name}</h3><p>{store.subtitle}</p></div>
      </div>
      <p className="store-card__description">{store.description}</p>
      <div className="tag-list">{store.methods.map((method) => <span className="tag" key={method}>{method}</span>)}<span className="tag">خرید نقدی</span></div>
      <div className="store-card__actions"><Link className="button button--primary" to="/catalog">مشاهده کالاها</Link><Link className="button button--secondary" to="/stores">شرایط فروشگاه</Link></div>
    </article>
  );
}

export default StoreCard;
