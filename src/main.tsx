import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        {" "}
        <RouterProvider router={router} />
        <Toaster richColors expand={true} position="top-right" />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
