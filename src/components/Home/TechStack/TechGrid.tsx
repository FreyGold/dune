import React, { useMemo, useState } from "react";
import {
   techCategories,
   getTechnologiesByCategory,
} from "../../../data/techStack";
import TechItem from "./TechItem";

function TechGrid() {
   const [selectedCategory, setSelectedCategory] = useState<string>("frontend");

   const filteredTechnologies = useMemo(() => {
      return getTechnologiesByCategory(selectedCategory);
   }, [selectedCategory]);

   return (
      <div className="space-y-6">
         {/* Category Filter Buttons */}
         <div className="flex flex-wrap gap-2 justify-start">
            {techCategories.map((category) => (
               <button
                  key={category.id}
                  onClick={() => {
                     setSelectedCategory(category.id);
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

         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
            {filteredTechnologies.map((tech) => (
               <TechItem key={tech.name} tech={tech} />
            ))}
         </div>
      </div>
   );
}

export default React.memo(TechGrid);
