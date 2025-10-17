import React, { useMemo } from "react";
import {
   getAllTechnologies,
   getTechnologiesByCategory,
} from "../../../data/techStack";
import TechItem from "./TechItem";

interface TechGridProps {
   activeCategory?: string | null;
   isMobile?: boolean;
   hoveredTech?: string | null;
   setHoveredTech?: (techName: string | null) => void;
}

function TechGrid({
   activeCategory,
   isMobile = false,
   hoveredTech,
   setHoveredTech,
}: TechGridProps) {
   // memoize technologies to keep stable reference between renders
   const technologies = useMemo(() => getAllTechnologies(), []);

   // Get filtered technologies based on selected category
   const filteredTechnologies = useMemo(() => {
      if (!activeCategory) return technologies;
      return getTechnologiesByCategory(activeCategory);
   }, [technologies, activeCategory]);

   // use fixed auto-rows so every grid cell has the same height and items fit cleanly
   return (
      <div className="space-y-6">
         {/* Tech Grid */}
         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
            {filteredTechnologies.map((tech, index) => (
               <TechItem
                  key={`${tech.name}-${index}`}
                  tech={tech}
                  index={index}
                  isMobile={isMobile}
                  hoveredTech={hoveredTech}
                  setHoveredTech={setHoveredTech}
               />
            ))}
         </div>
      </div>
   );
}

export default React.memo(TechGrid);
