import { useState, useEffect } from "react";
import TechGrid from "./TechGrid";
import TechMarquee from "./TechMarquee";

function TechStack() {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
   }, []);

   return (
      <div className="w-full h-auto bg-black relative tech-stack font-roboto">
         {/* Hero Section */}
         <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-18 [word-spacing:0.5rem] font-grotesk">
            <div className="lg:flex flex-col md:flex-row relative items-center lg:justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8">
               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
                  TECH STACK
               </h1>
               <img
                  src="/bio1.png"
                  alt=""
                  width="200"
                  height="60"
                  loading="eager"
                  className="hidden lg:block w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-25 xl:h-25"
               />
            </div>
         </div>

         {/* Animated Marquee Section - Only show on desktop for performance */}
         {!isMobile && <TechMarquee />}

         {/* Category Filter - Enhanced Typography */}
         <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 md:py-12 lg:py-16">
            {/* Tech Grid - Now simplified */}
            <TechGrid />
         </div>

         <div className="h-1 sm:h-2 w-full bg-black relative top-1 z-100"></div>
      </div>
   );
}

export default TechStack;
