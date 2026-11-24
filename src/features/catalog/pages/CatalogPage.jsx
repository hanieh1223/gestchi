import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../../../components/shared/Container.jsx";
import ProductCard from "../../../components/shared/ProductCard.jsx";
import SectionHeading from "../../../components/shared/SectionHeading.jsx";
import { products, stores } from "../../../data/demoData.js";

const storeById = Object.fromEntries(stores.map((store) => [store.id, store]));

function CatalogPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState("all");
  const categories = [...new Set(products.map((product) => product.category))];
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.category} ${storeById[product.storeId]?.name ?? ""}`.toLocaleLowerCase("fa").includes(query.trim().toLocaleLowerCase("fa"));
    return matchesQuery && (category === "all" || product.category === category);
  }), [category, query]);

  return (
    <Container className="page-section">
      <SectionHeading title="انتخاب کالا" description={`${filteredProducts.length.toLocaleString("fa-IR")} کالا در فهرست`} />
      <div className="catalog-toolbar">
        <label className="catalog-search">جستجو<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="نام کالا یا فروشگاه" /></label>
        <label className="catalog-filter">دسته کالا<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">همه دسته‌ها</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      </div>
      {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} storeName={storeById[product.storeId]?.name ?? "فروشگاه"} />)}</div> : <div className="empty-state">کالایی با این مشخصات پیدا نشد.</div>}
    </Container>
  );
}

export default CatalogPage;
