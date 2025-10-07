import Button from "../../ui/Button";
import Intro from "./Intro";
import SVG from "./SVG";

function Biography() {
   return (
      <div className="w-screen h-[130dvh] bg-black relative z-20 biography font-roboto">
         <SVG />

         <div className="px-10 pt-35 [word-spacing:0.5rem] font-grotesk ">
            <div className="flex relative items-center justify-between">
               <h1 className="text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
                  I AM A TOP NOTCH
               </h1>
               <img src="/bio1.png" alt="" className="h-15 w-25" />
            </div>
            <h1 className="text-[5.5rem] font-bold uppercase [word-spacing:-0.1rem]">
               Software Engineer
            </h1>
            <div className="pt-10">
               <Button textSize="text-lg">
                  <span className="font-medium">My Work</span>
               </Button>
            </div>
            <Intro />
         </div>
      </div>
   );
}

export default Biography;
