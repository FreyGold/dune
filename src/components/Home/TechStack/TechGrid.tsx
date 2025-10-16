import { useState, useEffect } from "react";
import {
   getAllTechnologies,
   getTechnologiesByCategory,
   type Technology,
} from "../../../data/techStack";

// Icon mapping for react-icons
import {
   SiReact,
   SiNextdotjs,
   SiTypescript,
   SiTailwindcss,
   SiJavascript,
   SiHtml5,
   SiCss3,
   SiVite,
   SiNodedotjs,
   SiExpress,
   SiNestjs,
   SiSwagger,
   SiGraphql,
   SiMongodb,
   SiPostgresql,
   SiSupabase,
   SiRedis,
   SiGit,
   SiGithub,
   SiFigma,
   SiPostman,
   SiDocker,
   SiPython,
   SiCplusplus,
   SiReactquery,
   SiFramer,
   SiGreensock,
   SiReacthookform,
   SiOpenjdk,
   SiRedux,
   SiAntdesign,
} from "react-icons/si";

const iconMap: Record<
   string,
   React.ComponentType<{ size?: number; color?: string; className?: string }>
> = {
   SiReact,
   SiNextdotjs,
   SiTypescript,
   SiTailwindcss,
   SiJavascript,
   SiHtml5,
   SiCss3,
   SiVite,
   SiNodedotjs,
   SiExpress,
   SiNestjs,
   SiSwagger,
   SiGraphql,
   SiMongodb,
   SiPostgresql,
   SiSupabase,
   SiRedis,
   SiGit,
   SiGithub,
   SiFigma,
   SiPostman,
   SiDocker,
   SiPython,
   SiCplusplus,
   SiReactquery,
   SiFramer,
   SiGreensock,
   SiReacthookform,
   SiOpenjdk,
   SiRedux,
   SiAntdesign,
};

interface TechGridProps {
   activeCategory: string;
}

function TechGrid({ activeCategory }: TechGridProps) {
   const [hoveredTech, setHoveredTech] = useState<string | null>(null);
   const [isMobile, setIsMobile] = useState(false);
   const [showAll, setShowAll] = useState(false);

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      checkMobile();
   }, []);

   const getTechnologies = (): Technology[] => {
      if (activeCategory === "all") {
         return getAllTechnologies();
      }
      return getTechnologiesByCategory(activeCategory);
   };

   const technologies = getTechnologies();

   // Limit items on mobile for better performance
   const displayedTechnologies =
      isMobile && !showAll
         ? technologies.slice(0, 12) // Show only first 12 items on mobile
         : technologies;

   return (
      <>
         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
            {displayedTechnologies.map((tech, index) => {
               const IconComponent = iconMap[tech.icon];
               if (!IconComponent) return null;

               return (
                  <div
                     key={`${tech.name}-${index}`}
                     className="group relative"
                     onMouseEnter={() => !isMobile && setHoveredTech(tech.name)}
                     onMouseLeave={() => !isMobile && setHoveredTech(null)}>
                     <div
                        className={`relative p-2 sm:p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg ${
                           isMobile
                              ? "hover:border-white/20"
                              : "hover:border-white/30 hover:shadow-lg transition-colors duration-200"
                        }`}
                        style={{
                           willChange: isMobile ? "auto" : "transform",
                           transform: isMobile ? "none" : "translateZ(0)", // Enable hardware acceleration
                        }}>
                        <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                           <div className="relative">
                              <IconComponent
                                 size={32}
                                 color={tech.color}
                                 className={`sm:w-10 sm:h-10 md:w-12 md:h-12 w-8 h-8 ${
                                    !isMobile
                                       ? "hover:scale-110 transition-transform duration-200"
                                       : ""
                                 }`}
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
                           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none" />
                        )}
                     </div>
                  </div>
               );
            })}
         </div>

         {/* Show More button for mobile */}
         {isMobile && technologies.length > 12 && !showAll && (
            <div className="flex justify-center mt-6">
               <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-grotesk font-semibold uppercase text-sm transition-colors duration-200">
                  Show More Technologies ({technologies.length - 12} remaining)
               </button>
            </div>
         )}

         {/* Show Less button for mobile */}
         {isMobile && showAll && technologies.length > 12 && (
            <div className="flex justify-center mt-6">
               <button
                  onClick={() => setShowAll(false)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-grotesk font-semibold uppercase text-sm transition-colors duration-200">
                  Show Less
               </button>
            </div>
         )}
      </>
   );
}

export default TechGrid;
