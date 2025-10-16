import {
   getAllTechnologies,
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

function TechGrid() {
   const technologies = getAllTechnologies();

   return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
         {technologies.map((tech) => {
            const IconComponent = iconMap[tech.icon];
            if (!IconComponent) return null;

            return (
               <div
                  key={tech.name}
                  className="group relative">
                  <div className="relative p-2 sm:p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-colors duration-200">
                     <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                        <div className="relative">
                           <IconComponent
                              size={32}
                              color={tech.color}
                              className="sm:w-10 sm:h-10 md:w-12 md:h-12 w-8 h-8"
                           />
                        </div>
                        <div className="space-y-2">
                           <h3 className="font-grotesk font-bold text-white text-sm sm:text-base md:text-lg uppercase tracking-wider leading-tight drop-shadow-sm">
                              {tech.name}
                           </h3>
                        </div>
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
}

export default TechGrid;
