import React, { useMemo, useState } from "react";
import {
   getAllTechnologies,
   techCategories,
   getTechnologiesByCategory,
} from "../../../data/techStack";
import TechItem from "./TechItem";

function TechGrid() {
   const [selectedCategory, setSelectedCategory] = useState<string | null>(
      null
   );
   const [isAllSelected, setIsAllSelected] = useState(true);

   // memoize technologies to keep stable reference between renders
   const technologies = useMemo(() => getAllTechnologies(), []);

   // Get filtered technologies based on selected category
   const filteredTechnologies = useMemo(() => {
      if (!selectedCategory) return technologies;
      return getTechnologiesByCategory(selectedCategory);
   }, [technologies, selectedCategory]);

   // use fixed auto-rows so every grid cell has the same height and items fit cleanly
   return (
      <div className="space-y-6">
         {/* Category Filter Buttons */}
         <div className="flex flex-wrap gap-2 justify-start">
            <button
               onClick={() => {
                  setSelectedCategory(null);
                  setIsAllSelected(true);
               }}
               className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 font-grotesk font-semibold uppercase text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base transition-all duration-300 ${
                  isAllSelected
                     ? "text-black bg-white"
                     : "text-white bg-transparent border border-white/20 hover:border-white/60"
               }`}>
               All
            </button>
            {techCategories.map((category) => (
               <button
                  key={category.id}
                  onClick={() => {
                     setSelectedCategory(category.id);
                     setIsAllSelected(false);
                  }}
                  className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 font-grotesk font-semibold uppercase text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base transition-all duration-300 ${
                     selectedCategory === category.id
                        ? "text-black bg-white"
                        : "text-white bg-transparent border border-white/20 hover:border-white/60"
                  }`}>
                  {category.name}
               </button>
            ))}
         </div>

         {/* Tech Grid */}
         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
            {filteredTechnologies.map((tech) => (
               <TechItem key={tech.name} tech={tech} />
            ))}
         </div>
      </div>
   );
}

export default React.memo(TechGrid);
