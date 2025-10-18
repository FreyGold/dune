import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import WorkCollection from "./WorkCollection";

const Projects = memo(function Projects() {
   const containerRef = useRef<HTMLDivElement>(null);
   const headingRef = useRef<HTMLHeadingElement>(null);
   const paragraphRef = useRef<HTMLParagraphElement>(null);

   useGSAP(
      () => {
         if (containerRef.current) {
            // Animate heading with clip path
            if (headingRef.current) {
               gsap.from(headingRef.current, {
                  clipPath: "inset(100% 0 0 0)",
               });
            }

            // Animate paragraph with clip path
            if (paragraphRef.current) {
               gsap.from(paragraphRef.current, {
                  clipPath: "inset(100% 0 0 0)",
               });
            }
         }
      },
      { scope: containerRef }
   );

   return (
      <div
         ref={containerRef}
         className="h-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative bg-black pt-28 sm:pt-48 md:pt-56 animate-fade-in">
         <div className="flex lg:justify-end">
            <h1
               ref={headingRef}
               className="font-grotesk text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[6.25rem] font-bold uppercase [word-spacing:-0.1rem] tracking-tight">
               Selected Projects
            </h1>
         </div>
         <div className="mt-4 sm:mt-6 lg:mt-8">
            <p
               ref={paragraphRef}
               className="text-lg sm:text-xl font-roboto text-[#A3A3A3] uppercase max-w-[90%] sm:max-w-[570px] sm:leading-[1.75]">
               Some of my work using various technologies and libraries
            </p>
         </div>
         <WorkCollection />
      </div>
   );
});

export default Projects;
