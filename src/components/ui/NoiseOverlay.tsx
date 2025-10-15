import { useEffect, useRef } from "react";

function NoiseOverlay({ type = "image" }: { type?: string }) {
   const inset =
      type === "card"
         ? "-left-40 -top-20"
         : "-left-40 -top-40 md:-left-60 md:-top-60 lg:-left-80 lg:-top-80";

   const overlayRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const element = overlayRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  // Resume animation when element is in viewport
                  element.style.animationPlayState = "running";
               } else {
                  // Pause animation when element is out of viewport
                  element.style.animationPlayState = "paused";
               }
            });
         },
         {
            // Use a small threshold to catch elements that are partially visible
            threshold: 0.1,
            // Add some root margin to start/resume animation slightly before the element enters viewport
            rootMargin: "50px"
         }
      );

      observer.observe(element);

      return () => {
         observer.unobserve(element);
      };
   }, []);

   return (
      <div
         ref={overlayRef}
         className={`absolute inset-0 w-[170%] h-[170%] ${inset} bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] opacity-25 mix-blend-overlay animate-grain overflow-x-clip`}
         style={{ animationPlayState: "paused" }} // Start paused, will be resumed by observer
      ></div>
   );
}

export default NoiseOverlay;
