import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "~/theme/theme-provider";
import App from "./app.tsx";
import { Toaster } from "./ui/toaster";

//------------------------------------------------------------------------------
// Root
//------------------------------------------------------------------------------

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
);
