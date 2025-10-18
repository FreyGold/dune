import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { GSAPProvider } from "../contexts/GSAPContext";
import { RouteChangeListener } from "../components/RouteChangeListener";

// Lazy load the cursor effect for better performance
const CursorEffect = lazy(() => import("../components/ui/Cursor"));

export default function RootLayout() {
   const [isFooterVisible, setIsFooterVisible] = useState(false);
   const contentRef = useRef<HTMLDivElement>(null);

   // Show footer after content loads
   useEffect(() => {
      if (contentRef.current) {
         // Small delay to ensure smooth transition
         const timer = setTimeout(() => {
            setIsFooterVisible(true);
         }, 100);

         return () => clearTimeout(timer);
      }
   }, []);

   return (
      <GSAPProvider>
         <RouteChangeListener />
         <Header />
         <div id="smooth-content" className="relative box-border">
            <div ref={contentRef}>
               <Outlet />
            </div>
            <div className={`transition-opacity duration-500 ${isFooterVisible ? 'opacity-100' : 'opacity-0'}`}>
               <Footer />
            </div>
         </div>
         <Suspense fallback={null}>
            <CursorEffect />
         </Suspense>
      </GSAPProvider>
   );
}
