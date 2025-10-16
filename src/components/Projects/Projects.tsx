import { memo } from "react";
import WorkCollection from "./WorkCollection";

const Projects = memo(function Projects() {
   return (
      <div className="h-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative bg-black pt-28 sm:pt-48 md:pt-56 animate-fade-in">
         <div className="flex lg:justify-end">
            <h1 className="font-grotesk text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[6.25rem] font-bold uppercase [word-spacing:-0.1rem] tracking-tight">
               All Projects
            </h1>
         </div>
         <div className="mt-4 sm:mt-6 lg:mt-8">
            <p className="text-lg sm:text-xl font-roboto text-[#A3A3A3] uppercase max-w-[90%] sm:max-w-[570px] sm:leading-[1.75]">
               A comprehensive collection of my creative work spanning web
               applications, mobile apps, and design systems.
            </p>
         </div>
         <WorkCollection />
      </div>
   );
});

export default Projects;
