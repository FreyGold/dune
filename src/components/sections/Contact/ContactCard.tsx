import React, { useEffect, useRef, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
   BiLogoGithub,
   BiLogoLinkedin,
   BiLogoTwitter,
   BiEnvelope,
} from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
   name: string;
   url: string;
   icon: React.ReactNode;
}

export default function ContactCardGSAP(): JSX.Element {
   const socialLinks: SocialLink[] = [
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

   const containerRef = useRef<HTMLDivElement | null>(null);
   const leftRef = useRef<HTMLDivElement | null>(null);
   const rightRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const left = leftRef.current;
      const right = rightRef.current;
      if (!left || !right) return;

      // Clear previous triggers (for hot reload)
      ScrollTrigger.getAll().forEach((t) => t.kill());

      ScrollTrigger.create({
         trigger: right,
         start: "top top+=150", // 150px offset to clear the navbar
         end: "bottom bottom+=50", // unpin exactly when the image bottom hits viewport bottom
         pin: left,
         pinSpacing: false,
         anticipatePin: 1,
         scrub: false,
         // markers: true, // uncomment to debug
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
   }, []);

   return (
      <div ref={containerRef} className="uppercase">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-start">
            {/* LEFT: pinned content */}
            <div className="relative">
               <div ref={leftRef} className="will-change-transform pt-8">
                  <h1 className="font-grotesk text-[3.125rem] font-bold">
                     Ring A Bell!
                  </h1>
                  <p className="text-[#A3A3A3] text-xl mt-5 font-roboto leading-relaxed">
                     Reach out and let's create something amazing together.
                     Let's achieve greatness.
                  </p>

                  <div className="mt-8">
                     <div className="flex flex-wrap gap-3 sm:gap-4">
                        {socialLinks.map((social, i) => (
                           <a
                              key={i}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors text-lg">
                              <span className="text-xl">{social.icon}</span>
                              {social.name}
                           </a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT: image scrolls normally */}
            <div ref={rightRef} className="relative">
               <div
                  className="relative w-full overflow-hidden rounded-2xl"
                  style={{
                     clipPath:
                        "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
                  }}>
                  <img
                     src="https://i.pinimg.com/1200x/eb/f7/2f/ebf72f8ec726b0eeb05c446c0d890cbe.jpg"
                     alt="Contact"
                     className="w-full max-h-[150dvh] object-cover"
                     loading="lazy"
                  />
               </div>
               <div className="h-[50vh]" />
            </div>
         </div>
      </div>
   );
}
