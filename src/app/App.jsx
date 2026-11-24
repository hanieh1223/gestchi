import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppErrorBoundary from "./components/AppErrorBoundary.jsx";
import StorefrontLayout from "../layouts/StorefrontLayout.jsx";
import HomePage from "../features/home/pages/HomePage.jsx";
import CatalogPage from "../features/catalog/pages/CatalogPage.jsx";
import StoresPage from "../features/stores/pages/StoresPage.jsx";
import WorkspacePage from "../features/workspace/pages/WorkspacePage.jsx";
import NotFoundPage from "../features/misc/pages/NotFoundPage.jsx";
import ProductDetailPage from "../features/products/pages/ProductDetailPage.jsx";
import StoreDetailPage from "../features/stores/pages/StoreDetailPage.jsx";
import {
  AdminWorkspacePage,
  CustomerAccountPage,
  CustomerExtraPage,
  CustomerInquiriesPage,
  MerchantWorkspacePage,
  MatchRoute,
  ComparePage,
  EligibilityPage,
  CheckoutPage,
  OrderDocumentPage,
  ShopSitePage,
} from "../features/workspace/pages/AdvancedPages.jsx";

const workspacePaths = [
  "cart", "orders", "login",
];

function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<StorefrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="stores" element={<StoresPage />} />
            {workspacePaths.map((path) => (
              <Route key={path} path={path} element={<WorkspacePage />} />
            ))}
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="match" element={<MatchRoute />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="eligibility" element={<EligibilityPage />} />
            <Route path="account" element={<CustomerAccountPage />} />
            <Route path="inquiry" element={<CustomerInquiriesPage />} />
            <Route path="my-inquiries" element={<CustomerInquiriesPage />} />
            <Route path="identity" element={<CustomerExtraPage />} />
            <Route path="credit-details" element={<CustomerExtraPage />} />
            <Route path="increase-credit" element={<CustomerExtraPage />} />
            <Route path="support" element={<CustomerExtraPage />} />
            <Route path="appeals" element={<CustomerExtraPage />} />
            <Route path="reminders" element={<CustomerExtraPage />} />
            <Route path="transactions" element={<CustomerExtraPage />} />
            <Route path="product/:productId" element={<ProductDetailPage />} />
            <Route path="store/:storeId" element={<StoreDetailPage />} />
            <Route path="order/:orderId" element={<WorkspacePage />} />
            <Route path="contract/:orderId" element={<OrderDocumentPage />} />
            <Route path="tracking/:orderId" element={<OrderDocumentPage />} />
            <Route path="gateway/:orderId" element={<OrderDocumentPage />} />
            <Route path="invoice/:orderId" element={<OrderDocumentPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="merchant/*" element={<MerchantWorkspacePage />} />
          <Route path="admin/*" element={<AdminWorkspacePage />} />
          <Route path="roles-audit" element={<AdminWorkspacePage />} />
          <Route path="shop-site/:storeId/*" element={<ShopSitePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;
