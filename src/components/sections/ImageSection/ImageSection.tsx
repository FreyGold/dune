import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NoiseOverlay from "../../ui/NoiseOverlay";

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
            className={`w-full h-full bg-cover bg-center zoom inset-0 grid place-content-center transition-opacity duration-500 `}
            style={{
               backgroundImage: "url('/city-sundown.jpg')",
            }}></div>
         <NoiseOverlay />
         <div className="dark-overlay absolute inset-0 bg-black opacity-0 z-10"></div>
      </section>
   );
}

export default ImageSection;
