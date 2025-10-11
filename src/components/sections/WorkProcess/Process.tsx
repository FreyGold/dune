import { processSteps } from "../../../data/process";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import Button from "../../ui/Button";

gsap.registerPlugin(ScrollTrigger);

function Process() {
   const processRef = useRef(null);
   const [isMobile, setIsMobile] = useState(() => {
      // Initialize mobile state on first render
      if (typeof window !== 'undefined') {
         return window.innerWidth < 768;
      }
      return false;
   });

   useEffect(() => {
      const checkIsMobile = () => {
         setIsMobile(window.innerWidth < 768); // md breakpoint
      };

      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);

      return () => window.removeEventListener('resize', checkIsMobile);
   }, []);

   useGSAP(
      () => {
         if (isMobile) return; // Skip animations on mobile

         // Animate section title on scroll
         gsap.from(
            ".process-title",
            {
               y: 100,
               opacity: 0,
               duration: 1.2,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: ".process-title",
                  start: "top 80%",
                  once: true,
                  end: "bottom 20%",
               },
            }
         );

         // Animate section description
         gsap.from(
            ".process-description",
            {
               y: 50,
               opacity: 0,
               duration: 1,
               delay: 0.3,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: ".process-description",
                  start: "top 85%",
                  end: "bottom 20%",
                  once: true,
               },
            }
         );

         // Animate process steps with stagger effect
         gsap.from(
            ".process-step",
            {
               y: 80,
               opacity: 0,
               duration: 1,
               ease: "power3.out",
               stagger: 0.2,
               scrollTrigger: {
                  trigger: ".process-steps-container",
                  start: "top 75%",
                  end: "bottom 20%",
                  once: true,
               },
            }
         );

         // Animate step numbers
         gsap.from(
            ".step-number",
            {
               scale: 0.8,
               rotation: -10,
               opacity: 0,
               duration: 0.8,
               ease: "back.out(1.7)",
               stagger: 0.2,
               delay: 0.1,
               scrollTrigger: {
                  trigger: ".process-steps-container",
                  start: "top 75%",
                  end: "bottom 20%",
                  once: true,
               },
            }
         );

         // Animate call to action section
         gsap.from(
            ".process-cta",
            {
               y: 30,
               opacity: 0,
               duration: 1,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: ".process-cta",
                  start: "top 90%",
                  end: "bottom 20%",
                  once: true,
               },
            }
         );
      },
      { scope: processRef, dependencies: [isMobile] }
   );

   return (
      <div
         ref={processRef}
         className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-black text-white">
         <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-10 sm:mb-12 lg:mb-16">
               <div className="flex justify-center lg:justify-start">
                  <h1 className="process-title font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold uppercase [word-spacing:-0.1rem] tracking-tight text-center lg:text-left">
                     My Process
                  </h1>
               </div>
               <div className="mt-4 sm:mt-6 lg:mt-8 max-w-3xl">
                  <p className="process-description text-base sm:text-lg md:text-xl font-roboto text-[#A3A3A3] leading-normal md:leading-relaxed">
                     Every great digital experience starts with a thoughtful
                     approach. Here's how I transform ideas into exceptional
                     digital solutions.
                  </p>
               </div>
            </div>

            {/* Process Steps */}
            <div className="process-steps-container space-y-8 sm:space-y-10 lg:space-y-12">
               {processSteps.map((step, index) => (
                  <div key={step.id}>
                     {/* Process Step */}
                     <div
                        className={`process-step flex flex-row items-start justify-start gap-4 sm:gap-6 lg:gap-8 group relative ${
                           index % 2 === 1 ? "flex-row-reverse" : ""
                        }`}>
                        {/* Vertical Outline Line - Left side for odd steps, Right side for even steps */}
                        <div
                           className={`hidden lg:block absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent ${
                              index % 2 === 1 ? "left-0" : "right-0"
                           }`}
                           style={{
                              backgroundImage:
                                 "repeating-linear-gradient(to bottom, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
                              backgroundSize: "1px 16px",
                           }}></div>

                        {/* Step Number */}
                        <div className="flex-shrink-0 relative z-10">
                           <div className="step-number w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                              <span className="font-grotesk text-base sm:text-lg lg:text-2xl font-bold text-white">
                                 {step.step}
                              </span>
                           </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 max-w-2xl relative z-10">
                           <div className="w-full">
                              <h3 className="font-grotesk text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold uppercase mb-2 sm:mb-3 lg:mb-4 text-white transition-colors duration-300 group-hover:text-white/90">
                                 {step.title}
                              </h3>
                              <p className="text-sm sm:text-base lg:text-lg font-roboto text-[#A3A3A3] leading-relaxed transition-colors duration-300 group-hover:text-[#B3B3B3]">
                                 {step.description}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Decorative Dashed Line */}
                     {index < processSteps.length - 1 && (
                        <div className="flex justify-center my-6 sm:my-8 lg:my-10">
                           <div className="w-full max-w-4xl">
                              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
                                 {/* Dashed line overlay */}
                                 <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    style={{
                                       backgroundImage:
                                          "repeating-linear-gradient(to right, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
                                       backgroundSize: "16px 1px",
                                    }}></div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </div>

            {/* Call to Action */}
            <div className="process-cta mt-10 sm:mt-12 lg:mt-16 text-center lg:text-left">
               <p className="font-grotesk text-lg sm:text-xl lg:text-2xl font-medium text-white mb-2">
                  Ready to start your project?
               </p>
               <p className="text-sm sm:text-base font-roboto text-[#A3A3A3] mb-6">
                  Let's discuss how we can bring your vision to life.
               </p>
               <div className="flex justify-center lg:justify-start">
                  <Button
                     variant="default"
                     className="font-semibold text-sm sm:text-lg">
                     Contact
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Process;
