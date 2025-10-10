import { useState } from "react";
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

   const getTechnologies = (): Technology[] => {
      if (activeCategory === "all") {
         return getAllTechnologies();
      }
      return getTechnologiesByCategory(activeCategory);
   };

   const technologies = getTechnologies();

   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-fade-in">
         {technologies.map((tech, index) => {
            const IconComponent = iconMap[tech.icon];
            if (!IconComponent) return null;

            return (
               <div
                  key={`${tech.name}-${index}`}
                  className="group relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}>
                  <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                     <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative">
                           <IconComponent
                              size={48}
                              color={tech.color}
                              className="transition-all duration-300"
                           />
                        </div>

                        <div className="space-y-2">
                           <h3 className="font-grotesk font-semibold text-white text-sm uppercase tracking-wide">
                              {tech.name}
                           </h3>
                        </div>
                     </div>

                     {/* Hover overlay - only show for currently hovered card */}
                     {hoveredTech === tech.name && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none animate-fade-in" />
                     )}
                  </div>
               </div>
            );
         })}
      </div>
   );
}

export default TechGrid;
