import React, { useMemo, useState } from "react";
import {
   getAllTechnologies,
   techCategories,
   getTechnologiesByCategory,
} from "../../../data/techStack";
import TechItem from "./TechItem";
import Button from "../../ui/Button";
function TechGrid() {
   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
   const [isAllSelected, setIsAllSelected] = useState(false);

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
            <Button
               onClick={() => {
                  setSelectedCategory(null);
                  setIsAllSelected(true);
               }}
               variant={isAllSelected ? 'selected' : 'small'}>
               All
            </Button>
            {techCategories.map((category) => (
               <Button
                  key={category.id}
                  onClick={() => {
                     setSelectedCategory(category.id);
                     setIsAllSelected(false);
                  }}
                  variant={selectedCategory === category.id ? 'selected' : 'small'}>
                  {category.name}
               </Button>
            ))}
         </div>

         {/* Tech Grid */}
         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 items-stretch justify-items-center auto-rows-[9rem] sm:auto-rows-[10rem] md:auto-rows-[11rem] lg:auto-rows-[12rem]">
            {filteredTechnologies.map((tech) => (
               <TechItem key={tech.name} tech={tech} />
            ))}
         </div>
      </div>
   );
}

export default React.memo(TechGrid);
