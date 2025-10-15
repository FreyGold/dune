import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { GSAPProvider } from "../../contexts/GSAPContext";
import { RouteChangeListener } from "../RouteChangeListener";

// Lazy load the cursor effect for better performance
const CursorEffect = lazy(() => import("../ui/Cursor"));

export default function RootLayout() {
  return (
    <GSAPProvider>
      <RouteChangeListener />
      <Header />
      <div id="smooth-content" className="relative box-border">
        <Outlet />
        <Footer />
      </div>
      <Suspense fallback={null}>
        <CursorEffect />
      </Suspense>
    </GSAPProvider>
  );
}
