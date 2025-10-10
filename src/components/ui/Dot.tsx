import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type DotProps = {
  color?: string;
  size?: number;
  pulseSize?: number;
  duration?: number;
  gap?: number;
};

export default function Dot({
  color = "#0099ff",
  size = 10,
  pulseSize = 30,
  duration = 1.2,
  gap = 0.8,
}: DotProps) {
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pulseRef.current) {
      // Set initial state
      gsap.set(pulseRef.current, {
        scale: 0.3,
        opacity: 0.6,
      });

      // Create the pulsing animation
      const tl = gsap.timeline({ repeat: -1, delay: gap });

      tl.to(pulseRef.current, {
        scale: 1,
        opacity: 0,
        duration: duration,
        ease: "power2.out",
      })
      .to(pulseRef.current, {
        scale: 0.3,
        opacity: 0.6,
        duration: 0,
        ease: "none",
      });

      return () => {
        tl.kill();
      };
    }
  }, [duration, gap]);

  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={pulseRef}
        className="absolute rounded-full"
        style={{
          width: pulseSize,
          height: pulseSize,
          backgroundColor: color,
          opacity: 0.5,
        }}
      />
      <div
        className="rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    </div>
  );
}
