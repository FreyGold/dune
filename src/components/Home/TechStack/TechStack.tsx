import { useState, useEffect, useRef } from "react";
import TechGrid from "./TechGrid";
import TechMarquee from "./TechMarquee";
import { techCategories } from "../../../data/techStack";

function TechStack() {
   const [activeCategory, setActiveCategory] = useState<string>("all");
   const [isMobile, setIsMobile] = useState(false);
   const sectionRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
   }, []);

   // Intersection Observer for performance optimization

   const categories = [
      { id: "all", name: "All Technologies" },
      ...techCategories.map((cat) => ({ id: cat.id, name: cat.name })),
   ];

   return (
      <div
         ref={sectionRef}
         className="w-full min-h-screen h-auto bg-black relative z-20 tech-stack font-roboto">
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

         {/* Animated Marquee Section - Hidden on mobile for performance and only when visible */}
         {!isMobile && <TechMarquee />}

         {/* Category Filter */}
         <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 md:py-12 lg:py-16">
            <div
               className={`flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12 `}>
               {categories.map((category) => (
                  <button
                     key={category.id}
                     onClick={() => setActiveCategory(category.id)}
                     className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 font-grotesk font-semibold uppercase text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base transition-all duration-300 ${
                        activeCategory === category.id
                           ? "text-black bg-white"
                           : "text-white bg-transparent border border-white/20 hover:border-white/60"
                     }`}>
                     {category.name}
                  </button>
               ))}
            </div>

            {/* Tech Grid */}
            <TechGrid activeCategory={activeCategory} />
         </div>

         <div className="h-1 sm:h-2 w-full bg-black relative top-1 z-1000"></div>
      </div>
   );
}

export default TechStack;
