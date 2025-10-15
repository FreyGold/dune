import Hero from "./Hero/Hero";
import ImageSection from "./ImageSection/ImageSection";
import Biography from "./Bio/Biography";
import { lazy, Suspense, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Lazy load below-the-fold components for better initial performance
const Featured = lazy(() => import("./FeaturedCases/Featured"));
const Process = lazy(() => import("./WorkProcess/Process"));
const TechStack = lazy(() => import("./TechStack/TechStack"));

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
   const main = useRef(null);
   const smoother = useRef<ScrollSmoother | null>(null);

   useGSAP(
      () => {
         // create the smooth scroller FIRST!
         const smootherInstance = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
         });

         smoother.current = smootherInstance;

         // Pin the ImageSection while Biography scrolls over it
         ScrollTrigger.create({
            trigger: ".section-image", // The ImageSection itself
            start: "top top", // When ImageSection reaches top of viewport
            end: () =>
               "+=" + document.querySelector(".biography")?.clientHeight, // Pin for the height of Biography
            pin: true, // Pin the trigger element
            pinSpacing: false, // Don't add space, let Biography overlap
            scrub: true,
         });
         gsap.to(".dark-overlay", {
            opacity: 0.7, // Adjust darkness level (0 = transparent, 1 = fully black)
            scrollTrigger: {
               trigger: ".section",
               start: "top top",
               end: () =>
                  "+=" + document.querySelector(".biography")?.clientHeight,
               scrub: true,
            },
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
      <>
         <Hero />
         <div className="parallax bg-black" ref={main}>
            <ImageSection />
            <Biography />
         </div>
         <Suspense fallback={<div className="h-screen bg-black" />}>
            <Featured />
            <Process />
            <TechStack />
         </Suspense>
      </>
   );
}
