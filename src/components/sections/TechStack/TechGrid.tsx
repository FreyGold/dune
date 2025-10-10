import { motion } from "framer-motion";
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

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12,
         },
      },
   };

   const technologies = getTechnologies();

   return (
      <motion.div
         className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
         variants={containerVariants}
         initial="hidden"
         animate="visible">
         {technologies.map((tech, index) => {
            const IconComponent = iconMap[tech.icon];
            if (!IconComponent) return null;

            return (
               <motion.div
                  key={`${tech.name}-${index}`}
                  variants={itemVariants}
                  className="group relative"
                  onHoverStart={() => setHoveredTech(tech.name)}
                  onHoverEnd={() => setHoveredTech(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/30 transition-all duration-300">
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
                        <motion.div
                           className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.2 }}
                        />
                     )}
                  </div>
               </motion.div>
            );
         })}
      </motion.div>
   );
}

export default TechGrid;
