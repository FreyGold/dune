import { useState, useEffect } from "react";

export default function CursorEffect() {
   const [pos, setPos] = useState({ x: 0, y: 0 });
   const [hovered, setHovered] = useState(false);
   const [projectCardHovered, setProjectCardHovered] = useState(false);

   useEffect(() => {
      const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
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
      };

      const onOut = (e: Event) => {
         const target = e.target as Element;
         if (target.closest(selector)) {
            setHovered(false);
         }
         if (target.closest(".project-card")) {
            setProjectCardHovered(false);
         }
      };

      window.addEventListener("mouseover", onOver);
      window.addEventListener("mouseout", onOut);

      return () => {
         window.removeEventListener("mouseover", onOver);
         window.removeEventListener("mouseout", onOut);
      };
   }, []);

   return (
      <div
         className={`pointer-events-none fixed top-0 left-0 z-100 transition-all duration-300 ease-out hidden sm:block ${
            projectCardHovered ? "mix-blend-normal" : "mix-blend-difference"
         }`}
         style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
         }}>
         <div
            className="relative bg-white rounded-full shadow-lg border border-gray-200 transition-all duration-500 ease-out transform-gpu"
            style={{
               width: projectCardHovered ? "92px" : "18px",
               height: projectCardHovered ? "46px" : "18px",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               transform: `scale(${
                  hovered && !projectCardHovered ? 1.6 : 1
               }) translate(-50%, -50%)`,
               transformOrigin: "center",
            }}>
            <span
               className={`text-black text-2xl font-roboto font-bold uppercase transition-all duration-300 ease-out ${
                  projectCardHovered ? "opacity-100" : "opacity-0"
               }`}
               style={{
                  padding: projectCardHovered ? "8px 16px" : "0px",
               }}>
               View
            </span>
         </div>
      </div>
   );
}
