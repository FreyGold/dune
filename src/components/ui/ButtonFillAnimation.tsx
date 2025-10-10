import React, { useState, cloneElement } from "react";
import { motion } from "framer-motion";

type HoverFillProps = {
   children: React.ReactElement;
   fillColor?: string;
   baseColor?: string;
   duration?: number;
   fillHeight?: string;
   invertTextOnFill?: boolean;
   className?: string;
   clipPath?: string;
};

export default function ButtonFillAnimation({
   children,
   fillColor = "#0099FF",
   baseColor = "#ffffff",
   duration = 0.35,
   fillHeight = "100%",
   invertTextOnFill = false,
   className = "",
   clipPath,
}: HoverFillProps) {
   const [hovered, setHovered] = useState(false);

   // Check if mobile (screens < 640px)
   const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

   const childElement = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
   const cloned = cloneElement(childElement, {
      style: {
         ...childElement.props?.style,
         background: "transparent",
         color:
            hovered && invertTextOnFill ? "#ffffff" : childElement.props?.style?.color,
         clipPath: undefined, // Remove clipPath from button
      },
      className: `${childElement.props?.className ?? ""} relative z-20`,
   });

   // On mobile, just return the children without animation
   if (isMobile) {
      return (
         <div className={`relative inline-block ${className}`} style={{ clipPath }}>
            {cloned}
         </div>
      );
   }

   return (
      <div
         className={`relative inline-block overflow-hidden ${className}`}
         style={{ clipPath }}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}>
         <div
            className="absolute inset-0"
            style={{ background: baseColor, zIndex: 0 }}
         />
         <motion.div
            initial={{ width: 0 }}
            animate={{ width: hovered ? "100%" : 0 }}
            transition={{ duration, ease: "easeInOut" }}
            style={{
               position: "absolute",
               left: 0,
               bottom: 0,
               height: fillHeight,
               background: fillColor,
               zIndex: 10,
               pointerEvents: "none",
            }}
         />
         <div className="relative z-20">{cloned}</div>
      </div>
   );
}
