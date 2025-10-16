import React from "react";
import iconMap from "../../Icons/iconMap";
import type { Technology } from "../../../data/techStack";

interface Props {
   tech: Technology;
}

function TechItem({ tech }: Props) {
   const IconComponent = iconMap[tech.icon];
   if (!IconComponent) return null;

   // fill the grid cell so all cards are uniform in size
   return (
      <div className="group w-full h-full">
         <div className="w-full h-full bg-white/3 border border-white/8 rounded-lg hover:border-white/20 transition-colors duration-200 flex items-center justify-center p-2">
            <div className="flex flex-col items-center text-center space-y-4 w-full">
               <div className="flex items-center justify-center flex-0 h-10 sm:h-12 md:h-14">
                  {/* rely on Tailwind for responsive sizing; avoid inline size prop so classes control layout */}
                  <IconComponent
                     color={tech.color}
                     className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  />
               </div>
               <div className="w-full flex-1 flex items-center">
                  <h3 className="font-grotesk font-semibold text-white text-sm sm:text-base md:text-sm uppercase tracking-wide truncate w-full leading-tight">
                     {tech.name}
                  </h3>
               </div>
            </div>
         </div>
      </div>
   );
}

export default React.memo(TechItem);
