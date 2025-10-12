import Hero from "./Hero/Hero";
import ImageSection from "./ImageSection/ImageSection";
import Biography from "./Bio/Biography";
import { lazy, Suspense } from "react";

// Lazy load below-the-fold components for better initial performance
const Featured = lazy(() => import("./FeaturedCases/Featured"));
const Process = lazy(() => import("./WorkProcess/Process"));
const TechStack = lazy(() => import("./TechStack/TechStack"));

export default function Home() {
   return (
      <>
         <Hero />
         <div className="parallax bg-black">
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
