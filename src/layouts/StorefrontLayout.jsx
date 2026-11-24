import { Outlet } from "react-router-dom";
import SiteHeader from "../components/shared/SiteHeader.jsx";
import SiteFooter from "../components/shared/SiteFooter.jsx";

function StorefrontLayout() {
  return (
    <>
      <SiteHeader />
      <main className="page-content"><Outlet /></main>
      <SiteFooter />
    </>
  );
}

export default StorefrontLayout;
