import { useState, useEffect, useRef } from "react";
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
   const [isVisible, setIsVisible] = useState(false);
   const marqueeRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const currentRef = marqueeRef.current;
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsVisible(entry.isIntersecting);
         },
         {
            threshold: 0.1,
            rootMargin: "50px",
         }
      );

      if (currentRef) {
         observer.observe(currentRef);
      }

      return () => {
         if (currentRef) {
            observer.unobserve(currentRef);
         }
      };
   }, []);

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
   // Reduced duplication from 2x to 1.5x for better performance
   const duplicatedTechnologies = [
      ...shuffledTechnologies.slice(0, Math.ceil(shuffledTechnologies.length / 2)),
      ...shuffledTechnologies,
   ];

   return (
      <div ref={marqueeRef} className="w-full flex justify-center items-center my-12 md:my-16">
         <div className="w-full overflow-hidden h-[50px] xs:h-[55px] sm:h-[70px] md:h-[90px] lg:h-[100px] flex items-center relative">
            <div className={`flex whitespace-nowrap ${isVisible ? 'animate-marquee-optimized' : ''}`}>
               {/* Render icons for seamless loop - optimized for performance */}
               {duplicatedTechnologies.map((tech, i) => {
                  const IconComponent = iconMap[tech.icon];
                  if (!IconComponent) return null;

                  return (
                     <div
                        key={`${tech.name}-${i}`}
                        className="mx-4 xs:mx-6 sm:mx-8 md:mx-12 lg:mx-14 flex-shrink-0 group"
                        style={{ willChange: 'transform' }}>
                        <IconComponent
                           size={48}
                           color={
                              tech.name === "Express.js" ||
                              tech.name === "Next.js" ||
                              tech.name === "GitHub"
                                 ? "#ffffffaa"
                                 : tech.color
                           }
                           className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform-gpu"
                        />
                     </div>
                  );
               })}
            </div>
            <div className="absolute left-0 top-0 h-full w-20 xs:w-24 sm:w-32 bg-gradient-to-r from-[#000] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-20 xs:w-24 sm:w-32 bg-gradient-to-l from-[#000] to-transparent pointer-events-none z-10" />
         </div>
      </div>
   );
}
