import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Container from "./Container.jsx";

const navigation = [
  { to: "/", label: "خانه", end: true },
  { to: "/catalog", label: "همه محصولات" },
  { to: "/stores", label: "فروشگاه‌ها" },
];

function SiteHeader() {
  const [search, setSearch] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    window.location.assign(`/catalog?q=${encodeURIComponent(search.trim())}`);
  }

  return (
    <header className="site-header">
      <Container>
        <div className="topnav">
          <Link className="brand" to="/" aria-label="صفحه اصلی قسط‌یار">
            <span className="brand-mark">ق</span>
            <span className="brand-copy"><strong>قسط‌یار</strong><small>راحت انتخاب کن، متناسب با شرایطت بخر</small></span>
          </Link>
          <form className="site-search" onSubmit={handleSubmit} role="search">
            <span aria-hidden="true">⌕</span>
            <input aria-label="جستجوی کالا" placeholder="چه کالایی می‌خواهی؟" value={search} onChange={(event) => setSearch(event.target.value)} />
          </form>
          <div className="header-actions">
            <Link to="/catalog" className="header-action">ورود / ثبت‌نام</Link>
            <Link to="/catalog" className="header-action">سبد خرید</Link>
            <Link to="/stores" className="header-action header-action--seller">پنل فروشگاه</Link>
          </div>
        </div>
        <nav className="main-nav" aria-label="منوی اصلی">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>
          ))}
          <span className="nav-spacer" />
          <span className="nav-caption">خرید نقدی و اقساطی با شرایط شفاف</span>
        </nav>
      </Container>
    </header>
  );
}

export default SiteHeader;
