import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Name() {
   useGSAP(() => {
      gsap.from(".to-up", {
         clipPath: "inset(100% 0 0 0)",

         duration: 0.8,
         delay: 0.3,
         ease: "power2.out",
      });
   });
   return (
      <div className="flex w-full flex-col justify-center items-center gap-1 leading-[0.8] font-grotesk mt-5 tracking-tight text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold">
         <h1
            className="to-up"
            data-lag="0.2"
            style={{ willChange: "transform" }}>
            AHMED
         </h1>
         <h1
            className="to-up"
            data-lag="0.2"
            style={{ willChange: "transform" }}>
            TAWFIK
         </h1>
      </div>
   );
}

export default Name;
