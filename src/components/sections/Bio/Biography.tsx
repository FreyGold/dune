import Button from "../../ui/Button";
import Intro from "./Intro";
import TechStack from "./Stack";
import SVG from "./SVG";
import { memo } from "react";

const Biography = memo(function Biography() {
   return (
      <div className="w-full min-h-screen h-auto bg-black relative z-20 biography font-roboto">
         <SVG />

         <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-35 [word-spacing:0.5rem] font-grotesk ">
            <div className="lg:flex flex-col md:flex-row relative items-center lg:justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8">
               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
                  I AM A TOP NOTCH
               </h1>
               <img
                  src="/bio1.png"
                  alt="Biography decoration"
                  className="hidden lg:block w-12 h-12 sm:w-15 sm:h-15 md:w-20 md:h-20 lg:w-25 lg:h-25"
                  loading="lazy"
                  decoding="async"
               />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
               Software Engineer
            </h1>
            <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-12">
               <Button
                  textSize="text-sm sm:text-base md:text-lg"
                  variant="default">
                  <span className="font-medium">My Work</span>
               </Button>
            </div>
            <Intro />
         </div>
         <TechStack />
         <div className="h-3 w-full bg-black relative top-1.5 z-1000"></div>
      </div>
   );
});

export default Biography;
