import { useState, useEffect, useRef, memo } from "react";

function CursorEffect() {
   const [pos, setPos] = useState({ x: 0, y: 0 });
   const [hovered, setHovered] = useState(false);
   const [projectCardHovered, setProjectCardHovered] = useState(false);
   const [comingSoonHovered, setComingSoonHovered] = useState(false);
   const [clickmed, setClickmed] = useState(false);
   const rafRef = useRef<number | null>(null);

   // Use RAF for smooth, performant cursor tracking
   useEffect(() => {
      const move = (e: MouseEvent) => {
         if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
         }

         rafRef.current = requestAnimationFrame(() => {
            setPos({ x: e.clientX, y: e.clientY });
         });
      };

      window.addEventListener("mousemove", move, { passive: true });
      return () => {
         window.removeEventListener("mousemove", move);
         if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
         }
      };
   }, []);

   useEffect(() => {
      const selector = "a, button";

      const onOver = (e: Event) => {
         const target = e.target as Element;
         if (target.closest(selector)) {
            setHovered(true);
         }
         if (target.closest(".project-card")) {
            setProjectCardHovered(true);
         }
         if (target.closest('[data-coming-soon="true"]')) {
            setComingSoonHovered(true);
         }
         if (target.closest(".click-me")) {
            setClickmed(true);
            console.log("here");
         }
      };

      const onOut = (e: MouseEvent) => {
         const target = e.target as Element;
         const relatedTarget = e.relatedTarget as Element;

         // Only set hovered to false if we're not moving to another link/button
         if (target.closest(selector) && !relatedTarget?.closest(selector)) {
            setHovered(false);
         }

         // Only set projectCardHovered to false if we're not moving to another project card
         if (
            target.closest(".project-card") &&
            !relatedTarget?.closest(".project-card")
         ) {
            setProjectCardHovered(false);
         }

         // Only set comingSoonHovered to false if we're not moving to another coming soon element
         if (
            target.closest('[data-coming-soon="true"]') &&
            !relatedTarget?.closest('[data-coming-soon="true"]')
         ) {
            setComingSoonHovered(false);
         }

         // Only set clickmed to false if we're not moving to another click-me element
         if (
            target.closest(".click-me") &&
            !relatedTarget?.closest(".click-me")
         ) {
            setClickmed(false);
         }
      };

      const onClick = (e: Event) => {
         const target = e.target as Element;
         if (target.closest(".project-card")) {
            // Reset cursor state when clicking project cards
            setProjectCardHovered(false);
            setHovered(false);
            setComingSoonHovered(false);
         }
      };

      window.addEventListener("mouseover", onOver);
      window.addEventListener("mouseout", onOut);
      window.addEventListener("click", onClick);

      return () => {
         window.removeEventListener("mouseover", onOver);
         window.removeEventListener("mouseout", onOut);
         window.removeEventListener("click", onClick);
      };
   }, []);

   if (window.innerWidth < 768) return null;
   const cursor = projectCardHovered || clickmed || comingSoonHovered;
   return (
      <div
         className={`pointer-events-none fixed top-0 left-0 z-100 transition-all duration-300 ease-out hidden sm:block ${
            cursor ? "mix-blend-normal" : "mix-blend-difference"
         }`}
         style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
         }}>
         <div
            className="relative bg-white rounded-full shadow-lg transition-all duration-500 ease-out transform-gpu"
            style={{
               width: cursor ? "92px" : "18px",
               height: cursor ? "46px" : "18px",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               transform: `scale(${
                  hovered && !cursor ? 1.6 : 1
               }) translate(-50%, -50%)`,
               transformOrigin: "center",
            }}>
            {projectCardHovered && !comingSoonHovered && (
               <span
                  className={`text-black text-2xl font-roboto font-bold uppercase transition-all duration-300 ease-out ${
                     projectCardHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                     padding: projectCardHovered ? "8px 16px" : "0px",
                  }}>
                  View
               </span>
            )}
            {clickmed && (
               <span
                  className={`text-black font-roboto font-bold uppercase transition-all duration-300 ease-out text-center`}
                  style={{
                     padding: clickmed ? "8px 16px" : "0px",
                  }}>
                  Click!
               </span>
            )}
            {comingSoonHovered && (
               <span
                  className={`text-black text-2xl font-roboto font-bold uppercase transition-all duration-300 ease-out`}
                  style={{
                     padding: comingSoonHovered ? "8px 16px" : "0px",
                  }}>
                  Soon
               </span>
            )}
         </div>
      </div>
   );
}

export default memo(CursorEffect);
