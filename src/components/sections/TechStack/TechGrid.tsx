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

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
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

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   const getTechnologies = (): Technology[] => {
      if (activeCategory === "all") {
         return getAllTechnologies();
      }
      return getTechnologiesByCategory(activeCategory);
   };

   const technologies = getTechnologies();

   return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
         {technologies.map((tech, index) => {
            const IconComponent = iconMap[tech.icon];
            if (!IconComponent) return null;

            return (
               <div
                  key={`${tech.name}-${index}`}
                  className="group relative"
                  onMouseEnter={() => !isMobile && setHoveredTech(tech.name)}
                  onMouseLeave={() => !isMobile && setHoveredTech(null)}>
                  <div className={`relative p-2 sm:p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 ${
                     isMobile
                        ? 'hover:border-white/20'
                        : 'hover:border-white/30 hover:scale-105 hover:shadow-lg'
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
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none" />
                     )}
                  </div>
               </div>
            );
         })}
      </div>
   );
}

export default TechGrid;
