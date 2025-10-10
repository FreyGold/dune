import { getAllTechnologies } from "../../../data/techStack";

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

export default function TechMarquee() {
   const technologies = getAllTechnologies();

   // Shuffle function to randomize icon order
   const shuffleArray = function <T>(array: T[]): T[] {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
   };

   const shuffledTechnologies = shuffleArray(technologies);
   const duplicatedTechnologies = [
      ...shuffledTechnologies,
      ...shuffledTechnologies,
      ...shuffledTechnologies,
      ...shuffledTechnologies,
   ];

   return (
      <div className="w-full flex justify-center items-center my-20 md:my-35">
         <div className="w-full overflow-hidden h-[60px] sm:h-[70px] md:h-[90px] flex items-center relative">
            <div className="flex animate-marquee-slow whitespace-nowrap">
               {/* Render icons twice for seamless loop */}
               {duplicatedTechnologies.map((tech, i) => {
                  const IconComponent = iconMap[tech.icon];
                  if (!IconComponent) return null;

                  return (
                     <div
                        key={`${tech.name}-${i}`}
                        className="mx-8 sm:mx-12 md:mx-14 flex-shrink-0 group">
                        <IconComponent
                           size={48}
                           color={
                              tech.name === "Express.js" ||
                              tech.name === "Next.js" ||
                              tech.name === "GitHub"
                                 ? "#ffffffaa"
                                 : tech.color
                           }
                           className="w-12 h-12 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        />
                     </div>
                  );
               })}
            </div>
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#000] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#000] to-transparent pointer-events-none z-10" />
         </div>
      </div>
   );
}
