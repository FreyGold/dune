import React from "react";
import iconMap from "../../Icons/iconMap";
import type { Technology } from "../../../data/techStack";

interface Props {
   tech: Technology;
   index: number;
   isMobile?: boolean;
   hoveredTech?: string | null;
   setHoveredTech?: (techName: string | null) => void;
}

function TechItem({
   tech,
   index,
   isMobile = false,
   hoveredTech,
   setHoveredTech,
}: Props) {
   const IconComponent = iconMap[tech.icon];
   if (!IconComponent) return null;

   return (
      <div
         key={`${tech.name}-${index}`}
         className="group relative"
         onMouseEnter={() => !isMobile && setHoveredTech?.(tech.name)}
         onMouseLeave={() => !isMobile && setHoveredTech?.(null)}>
         <div
            className={`relative p-2 sm:p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 ${
               isMobile
                  ? "hover:border-white/20"
                  : "hover:border-white/30 hover:scale-105 hover:shadow-lg"
            }`}>
            <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
               <div className="relative">
                  <IconComponent
                     size={32}
                     color={tech.color}
                     className="sm:w-10 sm:h-10 md:w-12 md:h-12 w-8 h-8 transition-all duration-300"
                  />
               </div>

               <div className="space-y-2">
                  <h3 className="font-grotesk font-semibold text-white text-xs sm:text-sm uppercase tracking-wide">
                     {tech.name}
                  </h3>
               </div>
            </div>

            {/* Hover overlay - only show for desktop and currently hovered card */}
            {!isMobile && hoveredTech === tech.name && (
               <div className="absolute inset-0 rounded-lg pointer-events-none" />
            )}
         </div>
      </div>
   );
}

export default React.memo(TechItem);
