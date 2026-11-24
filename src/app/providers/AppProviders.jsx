import { StrictMode } from "react";

function AppProviders({ children }) {
  return <StrictMode>{children}</StrictMode>;
}

export default AppProviders;
