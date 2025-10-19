import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiChevronDown } from "react-icons/fi";

export default function SwipeDownIndicator() {
   const ref = useRef<HTMLDivElement>(null);
   const [hidden, setHidden] = useState(false);
   const startY = useRef<number | null>(null);

   // Subtle, slow arrow drift
   useEffect(() => {
      if (!ref.current) return;
      const arrow = ref.current.querySelector(".arrow");
      gsap.to(arrow, {
         y: 6,
         opacity: 0.5,
         repeat: -1,
         yoyo: true,
         duration: 0.6,
         ease: "power1.inOut",
      });
   }, []);

   // Hide animation
   useEffect(() => {
      if (!ref.current) return;
      gsap.to(ref.current, {
         opacity: hidden ? 0 : 1,
         y: hidden ? 15 : 0,
         duration: 0.5,
         ease: "power2.out",
         pointerEvents: hidden ? "none" : "auto",
      });
   }, [hidden]);

   // Hide on scroll
   useEffect(() => {
      const onScroll = () => window.scrollY > 40 && setHidden(true);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   // Hide on swipe down (mobile)
   const onTouchStart = (e: React.TouchEvent) => {
      startY.current = e.touches[0].clientY;
   };
   const onTouchMove = (e: React.TouchEvent) => {
      if (startY.current && e.touches[0].clientY - startY.current > 40)
         setHidden(true);
   };

   return (
      <div
         ref={ref}
         onTouchStart={onTouchStart}
         onTouchMove={onTouchMove}
         className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/80 select-none">
         <FiChevronDown className="arrow" size={32} strokeWidth={1} />
      </div>
   );
}
