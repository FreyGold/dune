import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useRef, lazy, Suspense } from "react";

// Lazy load the cursor effect for better performance
const CursorEffect = lazy(() => import("../ui/Cursor"));

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function RootLayout() {
   const main = useRef(null);

   useGSAP(
      () => {
         // create the smooth scroller FIRST!
         ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
         });

         // Refresh after DOM is ready
         setTimeout(() => {
            ScrollSmoother.refresh();
            ScrollTrigger.refresh();
         }, 100);
      },
      { scope: main }
   );

   return (
      <div id="smooth-wrapper" ref={main}>
         <Header />
         <div id="smooth-content" className="relative box-border">
            <Outlet />
            <Footer />
         </div>
         <Suspense fallback={null}>
            <CursorEffect />
         </Suspense>
      </div>
   );
}
