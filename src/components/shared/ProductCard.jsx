import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatters.js";

function ProductCard({ product, storeName }) {
  return (
    <article className="surface-card product-card">
      <Link className="product-art" to={`/product/${product.id}`} aria-label={`مشاهده ${product.name}`}>
        <span aria-hidden="true">{product.icon}</span>
        <small>{product.tag}</small>
      </Link>
      <div className="product-card__body">
        <div className="product-meta"><span>{storeName}</span><span>{product.category}</span></div>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <strong className="product-price">{formatCurrency(product.price)}</strong>
        <Link className="button button--secondary button--block" to={`/product/${product.id}`}>مشاهده شرایط و خرید</Link>
      </div>
    </article>
  );
}

export default ProductCard;
