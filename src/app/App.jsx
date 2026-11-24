import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StorefrontLayout from "../layouts/StorefrontLayout.jsx";
import HomePage from "../features/home/pages/HomePage.jsx";
import CatalogPage from "../features/catalog/pages/CatalogPage.jsx";
import StoresPage from "../features/stores/pages/StoresPage.jsx";
import NotFoundPage from "../features/misc/pages/NotFoundPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StorefrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
