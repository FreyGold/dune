import Intro from "./Intro";
import TechStack from "./Stack";
import SVG from "./SVG";
import { memo } from "react";

const Biography = memo(function Biography() {
   return (
      <div className="w-full min-h-screen h-auto bg-black relative z-20 biography font-roboto">
         <SVG />
         <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-8 sm:pt-12 md:pt-14 lg:pt-18 xl:pt-20 [word-spacing:0.5rem] font-grotesk">
            <div className="lg:flex flex-col md:flex-row relative items-center lg:justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8">
               <h1 className="text-3xl lg:text-5xl xl:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
                  I AM A
               </h1>
               <img
                  src="/bio1.png"
                  alt="Biography decoration"
                  className="hidden xl:block w-12 h-8 sm:w-15 sm:h-10 md:w-20 md:h-12.5 lg:w-30 lg:h-20"
                  loading="lazy"
                  decoding="async"
               />
            </div>
            <h1 className="text-3xl lg:text-5xl xl:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
               Fullstack Developer
            </h1>
            <div className="pt-2 sm:pt-4 md:pt-6 lg:pt-8"></div>
            <Intro />
         </div>
         <TechStack />
         <div className="h-3 w-screen bg-black absolute -bottom-1.5 z-50 p-0 m-0 left-0"></div>
      </div>
   );
});

export default Biography;
