import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ horizontal: false });

function ImageSection() {
   useGSAP(() => {
      const setupAnimations = () => {
         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: ".section",
               start: "top bottom",
               end: "bottom bottom",
               scrub: true,
            },
         });
         tl.from(".zoom", { scaleX: 2 });
      };

      // Delay to ensure ScrollSmoother is ready
      const timer = setTimeout(setupAnimations, 200);

      return () => clearTimeout(timer);
   });

   return (
      <section className="section w-full h-[80dvh] sm:h-[90dvh] md:h-[100dvh] relative overflow-hidden z-10 section-image">
         <div
            className="w-full h-full bg-cover bg-center zoom inset-0 grid place-content-center"
            style={{ backgroundImage: "url('/city-sundown.png')" }}></div>
         <div className="absolute inset-0 w-[150%] h-[150%] -left-40 sm:-left-60 md:-left-80 -top-40 sm:-top-60 md:-top-80 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] opacity-25 mix-blend-overlay animate-grain overflow-x-clip"></div>
         <div className="dark-overlay absolute inset-0 bg-black opacity-0 z-10"></div>
      </section>
   );
}

export default ImageSection;
