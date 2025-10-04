import { motion } from "framer-motion";

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
   return (
      <div className="relative flex items-center justify-center">
         <motion.div
            className="absolute rounded-full"
            style={{
               width: pulseSize,
               height: pulseSize,
               backgroundColor: color,
               opacity: 0.5,
            }}
            initial={{ scale: 0.3, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{
               duration,
               repeat: Infinity,
               repeatDelay: gap,
               ease: "easeOut",
            }}
         />
         <div
            className="rounded-full"
            style={{ width: size, height: size, backgroundColor: color }}
         />
      </div>
   );
}
