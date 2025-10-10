import Button from "../../ui/Button";
import Intro from "./Intro";
import TechStack from "./Stack";
import SVG from "./SVG";

function Biography() {
   return (
      <div className="w-full min-h-screen h-auto bg-black relative z-20 biography font-roboto">
         <SVG />

         <div className="px-4 sm:px-8 md:px-10 pt-20 md:pt-35 [word-spacing:0.5rem] font-grotesk ">
            <div className="lg:flex flex-col md:flex-row relative items-center lg:justify-between gap-4 md:gap-8">
               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
                  I AM A TOP NOTCH
               </h1>
               <img
                  src="/bio1.png"
                  alt=""
                  className="hidden lg:block sm:h-15 sm:w-15 md:h-15 md:w-25"
               />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
               Software Engineer
            </h1>
            <div className="pt-10">
               <Button textSize="text-lg">
                  <span className="font-medium">My Work</span>
               </Button>
            </div>
            <Intro />
         </div>
         <TechStack />
         <div className="h-2 w-full bg-black relative top-1 z-1000"></div>
      </div>
   );
}

export default Biography;
