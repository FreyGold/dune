import Name from "./units/Name";
import Dot from "../../ui/Dot";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, memo } from "react";
import LightRays from "../../LightRays";
import SwipeDownIndicator from "../../ui/SwipeDownIndicator";

const Hero = memo(function Hero() {
   const crossedRef = useRef<HTMLSpanElement | null>(null);
   const lineRef = useRef<HTMLSpanElement | null>(null);

   const isMobile = window.innerWidth < 1028;

   useGSAP(() => {
      if (!lineRef.current) return;

      const tl = gsap.timeline({ paused: true });
      tl.to(lineRef.current, {
         width: "100%",
         duration: 0.4,
         ease: "power2.out",
      });

      crossedRef.current?.addEventListener("mouseenter", () => tl.play());
      crossedRef.current?.addEventListener("mouseleave", () => tl.reverse());
   });

   useGSAP(() => {
      gsap.from(".to-left", {
         x: -100,
         opacity: 0,
         duration: 0.5,
         delay: 0.3,
         ease: "power2.out",
      });
   });
   useGSAP(() => {
      gsap.from(".to-up-footer", {
         y: 100,
         opacity: 0,
         duration: 0.5,
         delay: 0.3,
         ease: "power2.out",
      });
      gsap.from(".shrink-height", {
         height: "100vh",
         duration: 0.5,
         delay: 0.5,
         ease: "power2.inOut",
      });
   });

   return (
      <div className="w-full h-[100dvh] relative flex justify-center items-center shrink-height">
         {!isMobile && (
            <LightRays
               raysOrigin="top-center"
               raysColor="#c7c7c7"
               raysSpeed={1.2}
               lightSpread={0.8}
               saturation={1.2}
               rayLength={1.2}
               followMouse={true}
               mouseInfluence={0.2}
               noiseAmount={0.1}
               distortion={0.05}
               className="custom-rays"
            />
         )}

         {isMobile && (
            <LightRays
               raysOrigin="left"
               raysColor="#c7c7c7"
               raysSpeed={1.2}
               lightSpread={1.5}
               saturation={1.2}
               rayLength={1.2}
               followMouse={true}
               mouseInfluence={0.2}
               noiseAmount={0.1}
               distortion={0.05}
               className="custom-rays"
            />
         )}
         {isMobile && (
            <LightRays
               raysOrigin="right"
               raysColor="#c7c7c7"
               raysSpeed={1.2}
               lightSpread={1.5}
               saturation={1.2}
               rayLength={1.2}
               followMouse={true}
               mouseInfluence={0.2}
               noiseAmount={0.1}
               distortion={0.05}
               className="custom-rays"
            />
         )}
         <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex items-center gap-2 sm:gap-3 tracking-wide to-left">
               <Dot />
               <p className="font-roboto text-[#B3B3B3] text-sm sm:text-base md:text-lg uppercase">
                  <span className="sm:hidden">
                     AVAILABLE Freelance or fulltime
                  </span>
                  <span className="hidden sm:inline">
                     AVAILABLE FOR FREELANCE AND FULLTIME Positions
                  </span>
               </p>
            </div>
            <Name />
         </div>
         <div className="footer absolute bottom-0">
            <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-6 md:px-8 lg:px-10 items-center sm:items-center w-screen py-4 sm:py-6 md:py-8 uppercase text-sm sm:text-base md:text-lg font-light to-up-footer gap-2 sm:gap-0">
               <p className="hidden sm:block">BASED IN Cairo, Egypt</p>
               <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0">
                  <span
                     className="crossed cursor-pointer relative inline-block"
                     ref={crossedRef}>
                     ///Frontend Developer
                     <span
                        ref={lineRef}
                        className="absolute top-1/2 left-0 h-[2px] bg-current w-0 -translate-y-1/2"></span>
                  </span>
                  <span className="line absolute bottom-0 left-0 h-[2px] bg-current w-0"></span>
                  <span className="hidden sm:inline"> + </span>All Around
                  Software Engineer
               </div>
            </div>
         </div>
         {/* <SwipeDownIndicator /> */}
      </div>
   );
});

export default Hero;
