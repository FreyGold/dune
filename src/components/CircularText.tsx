import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ value: 0 });
  const animationRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Start the rotation animation
    const startRotation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.timeline({ repeat: -1 });

      animationRef.current.to(rotationRef.current, {
        value: 360,
        duration: spinDuration,
        ease: "none",
        onUpdate: () => {
          if (containerRef.current) {
            gsap.set(containerRef.current, { rotation: rotationRef.current.value });
          }
        },
      });
    };

    startRotation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [spinDuration, text]);

  const handleHoverStart = () => {
    if (!animationRef.current || !containerRef.current) return;

    let newDuration = spinDuration;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        newDuration = spinDuration * 2;
        break;
      case "speedUp":
        newDuration = spinDuration / 4;
        break;
      case "pause":
        // Pause the rotation
        animationRef.current.pause();
        gsap.to(containerRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        return;
      case "goBonkers":
        newDuration = spinDuration / 20;
        scaleVal = 0.8;
        break;
    }

    // Update animation duration
    animationRef.current.duration(newDuration);

    // Animate scale
    gsap.to(containerRef.current, {
      scale: scaleVal,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleHoverEnd = () => {
    if (!animationRef.current || !containerRef.current) return;

    if (onHover === "pause") {
      // Resume the rotation
      animationRef.current.resume();
    } else {
      // Reset to normal speed and scale
      animationRef.current.duration(spinDuration);
    }

    gsap.to(containerRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const letters = Array.from(text);

  return (
    <div
      ref={containerRef}
      className={`m-0 mx-auto rounded-full w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] relative font-black text-white text-center cursor-pointer origin-center ${className}`}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}>
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-lg sm:text-xl md:text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;
