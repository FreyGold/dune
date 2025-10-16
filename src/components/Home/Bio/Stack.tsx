// TechBoard.tsx
import {
   SiReact,
   SiNextdotjs,
   SiTailwindcss,
   SiSupabase,
   SiExpress,
   SiNestjs,
   SiMongodb,
   SiTypescript,
   SiJavascript,
   SiJsonwebtokens,
} from "react-icons/si";
const icons = [
   { key: "react", icon: SiReact, color: "#494949" },
   { key: "next", icon: SiNextdotjs, color: "#494949" },
   { key: "tailwind", icon: SiTailwindcss, color: "#494949" },
   { key: "supabase", icon: SiSupabase, color: "#494949" },
   { key: "json-server", icon: SiJsonwebtokens, color: "#494949" }, // stand-in
   { key: "express", icon: SiExpress, color: "#494949" },
   { key: "nest", icon: SiNestjs, color: "#494949" },
   { key: "mongodb", icon: SiMongodb, color: "#494949" },
   { key: "typescript", icon: SiTypescript, color: "#494949" },
   { key: "javascript", icon: SiJavascript, color: "#494949" },
];

// Shuffle function to randomize icon order
const shuffleArray = function <T>(array: T[]): T[] {
   const shuffled = [...array];
   for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
   }
   return shuffled;
};

const shuffledIcons = shuffleArray(icons);
const duplicatedIcons = [...shuffledIcons, ...shuffledIcons, ...shuffledIcons];

export default function TechStack() {
   return (
      <div className="w-full flex justify-center items-center my-8 mt-15 md:my-35">
         <div className="w-full overflow-hidden h-[50px] xs:h-[55px] sm:h-[70px] md:h-[90px] lg:h-[100px] flex items-center relative">
            <div className="flex animate-marquee whitespace-nowrap">
               {/* Render icons twice for seamless loop */}
               {duplicatedIcons.map(({ key, icon: Icon, color }, i) => (
                  <div
                     key={`${key}-${i}`}
                     className="mx-4 xs:mx-6 sm:mx-8 md:mx-12 lg:mx-14 flex-shrink-0">
                     <Icon
                        size={48}
                        className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                        color={color}
                     />
                  </div>
               ))}
            </div>
            <div className="absolute left-0 top-0 h-full w-20 xs:w-24 sm:w-32 bg-gradient-to-r from-[#000] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-20 xs:w-24 sm:w-32 bg-gradient-to-l from-[#000] to-transparent pointer-events-none z-10" />
         </div>
      </div>
   );
}
