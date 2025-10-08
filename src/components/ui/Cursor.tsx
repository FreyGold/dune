import { useState, useEffect } from "react";

export default function CursorEffect() {
   const [pos, setPos] = useState({ x: 0, y: 0 });
   const [hovered, setHovered] = useState(false);

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
      };

      const onOut = (e: Event) => {
         const target = e.target as Element;
         if (target.closest(selector)) {
            setHovered(false);
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
         className="pointer-events-none fixed top-0 left-0 rounded-full bg-white mix-blend-difference transition-transform duration-400 ease-out z-100"
         style={{
            width: "18px",
            height: "18px",
            transform: `translate(${pos.x - 10}px, ${pos.y - 10}px) scale(${
               hovered ? 1.6 : 1
            })`,
         }}
      />
   );
}
