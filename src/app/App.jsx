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

const pendingPaths = [
  "cart", "checkout", "orders", "account", "login", "inquiry",
  "my-inquiries", "match", "compare", "eligibility", "identity",
  "credit-details", "increase-credit", "roles-audit",
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
            {pendingPaths.map((path) => (
              <Route key={path} path={path} element={<WorkspacePage />} />
            ))}
            <Route path="product/:productId" element={<ProductDetailPage />} />
            <Route path="store/:storeId" element={<StoreDetailPage />} />
            <Route path="order/:orderId" element={<WorkspacePage />} />
            <Route path="tracking/:orderId" element={<WorkspacePage />} />
            <Route path="invoice/:orderId" element={<WorkspacePage />} />
            <Route path="merchant/*" element={<WorkspacePage />} />
            <Route path="admin/*" element={<WorkspacePage />} />
            <Route path="shop-site/:storeId/*" element={<WorkspacePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;
