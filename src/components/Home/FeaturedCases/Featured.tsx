import WorkCollection from "./card/WorkCollection";
import { memo } from "react";

const Featured = memo(function Featured() {
   return (
      <div className="h-full px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 relative bg-black ">
         <div className="h-3 w-screen bg-black absolute -top-1.5 z-50 p-0 m-0 left-0"></div>
         <div className="flex lg:justify-end">
            <h1 className="font-grotesk text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[6.25rem] font-bold uppercase [word-spacing:-0.1rem] tracking-tight">
               Projects
            </h1>
         </div>
         <div className="mt-4 sm:mt-6 lg:mt-8">
            <p className="text-lg sm:text-xl font-roboto text-[#A3A3A3] uppercase max-w-[90%] sm:max-w-[570px] sm:leading-[1.75]">
               I'm passionate about coding and facing new challenges, working on
               new projects and learning new things, I always find myself in a
               flow state when I code where I don't notice the time passing by,
               I strive to perfect my craft and be knowledgable about the deep
               layers of the technology i work with.
            </p>
         </div>
         <WorkCollection />
      </div>
   );
});

export default Featured;
