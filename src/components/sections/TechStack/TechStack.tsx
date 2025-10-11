import { useState } from "react";
import Button from "../../ui/Button";
import TechGrid from "./TechGrid";
import TechMarquee from "./TechMarquee";
import { techCategories } from "../../../data/techStack";

function TechStack() {
   const [activeCategory, setActiveCategory] = useState<string>("all");

   const categories = [
      { id: "all", name: "All Technologies" },
      ...techCategories.map((cat) => ({ id: cat.id, name: cat.name })),
   ];

   return (
      <div className="w-full min-h-screen h-auto bg-black relative z-20 tech-stack font-roboto">
         {/* Hero Section */}
         <div className="px-4 sm:px-8 md:px-10 pt-8 md:pt-18 [word-spacing:0.5rem] font-grotesk">
            <div className="lg:flex flex-col md:flex-row relative items-center lg:justify-between gap-4 md:gap-8">
               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
                  TECH STACK
               </h1>
               <img
                  src="/bio1.png"
                  alt=""
                  width="200"
                  height="60"
                  loading="eager"
                  className="hidden lg:block sm:h-15 sm:w-15 md:h-15 md:w-25"
               />
            </div>
            <div className="pt-6 md:pt-12">
               <Button textSize="text-sm sm:text-lg" variant="default">
                  <span className="font-medium">View Projects</span>
               </Button>
            </div>
         </div>

         {/* Animated Marquee Section */}
         <TechMarquee />

         {/* Category Filter */}
         <div className="px-4 sm:px-8 md:px-10 py-8 md:py-16">
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
               {categories.map((category) => (
                  <button
                     key={category.id}
                     onClick={() => setActiveCategory(category.id)}
                     className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 font-grotesk font-semibold uppercase text-xs sm:text-sm transition-all duration-300 ${
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

         <div className="h-2 w-full bg-black relative top-1 z-1000"></div>
      </div>
   );
}

export default TechStack;
