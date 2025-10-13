import { useRef, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
   BiLogoGithub,
   BiLogoLinkedin,
   BiLogoTwitter,
   BiEnvelope,
} from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactCardGSAP(): JSX.Element {
   const leftRef = useRef<HTMLDivElement | null>(null);
   const rightRef = useRef<HTMLDivElement | null>(null);

   useGSAP(() => {
      // Only run animation on medium screens and up (when we have 2-column layout)
      const isMediumScreen = window.matchMedia("(min-width: 768px)").matches;
      if (!isMediumScreen) return;

      const left = leftRef.current;
      const right = rightRef.current;
      if (!left || !right) return;
      const triggerHeight = right.offsetHeight - left.offsetHeight - 50;

      ScrollTrigger.killAll();

      const trigger = ScrollTrigger.create({
         trigger: right,
         start: "top top+=150",
         end: `+=${triggerHeight}`,
         pin: left,
         pinSpacing: false,
         scrub: true,
         anticipatePin: 1,
      });

      const refreshOnImageLoad = () => {
         trigger.refresh();
      };

      const img = right.querySelector("img");
      if (img && !img.complete) {
         img.addEventListener("load", refreshOnImageLoad);
      }

      return () => {
         img?.removeEventListener("load", refreshOnImageLoad);
         ScrollTrigger.killAll();
      };
   }, []);

   const socialLinks = [
      {
         name: "GitHub",
         url: "https://github.com/FreyGold",
         icon: <BiLogoGithub />,
      },
      {
         name: "Twitter",
         url: "https://x.com/TeslaLeftArm",
         icon: <BiLogoTwitter />,
      },
      {
         name: "LinkedIn",
         url: "https://www.linkedin.com/in/ahmed-tawfik-458353165/",
         icon: <BiLogoLinkedin />,
      },
      {
         name: "Email",
         url: "mailto:ahmedtawfik833@gmail.com",
         icon: <BiEnvelope />,
      },
   ];

   return (
      <div className="uppercase">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-15 items-start">
            {/* LEFT */}
            <div className="relative">
               <div
                  ref={leftRef}
                  className="will-change-transform pt-4 md:pt-6 lg:pt-8">
                  <h1 className="font-grotesk text-3xl md:text-4xl lg:text-[3.125rem] font-bold leading-tight">
                     Ring A Bell!
                  </h1>
                  <p className="text-[#A3A3A3] text-lg md:text-xl mt-3 md:mt-4 lg:mt-5 font-roboto leading-relaxed">
                     Reach out and let's create something amazing together.
                     Let's achieve greatness.
                  </p>

                  <div className="mt-6 md:mt-8">
                     <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
                        {socialLinks.map((social, i) => (
                           <a
                              key={i}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 md:gap-3 bg-white text-black px-4 md:px-5 lg:px-6 py-2 md:py-3 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm md:text-base lg:text-lg">
                              <span className="text-lg md:text-xl">
                                 {social.icon}
                              </span>
                              {social.name}
                           </a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT */}
            <div ref={rightRef} className="relative">
               <div
                  className="relative w-full overflow-hidden rounded-xl md:rounded-2xl"
                  style={{
                     clipPath:
                        "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
                  }}>
                  <img
                     src="/contact.jpg"
                     alt="Contact"
                     className="w-full max-h-[60dvh] md:max-h-[80dvh] lg:max-h-[100dvh] object-cover"
                     loading="lazy"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
