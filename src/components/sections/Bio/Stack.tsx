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

export default function TechStack() {
   const icons = [
      { key: "react", icon: SiReact, color: "#61DAFB" },
      { key: "next", icon: SiNextdotjs, color: "#ffffff" },
      { key: "tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { key: "supabase", icon: SiSupabase, color: "#3ECF8E" },
      { key: "json-server", icon: SiJsonwebtokens, color: "#FFCA28" }, // stand-in
      { key: "express", icon: SiExpress, color: "#47A248" },
      { key: "nest", icon: SiNestjs, color: "#E0234E" },
      { key: "mongodb", icon: SiMongodb, color: "#47A248" },
      { key: "typescript", icon: SiTypescript, color: "#3178C6" },
      { key: "javascript", icon: SiJavascript, color: "#F7DF1E" },
   ];

   return (
      <div className="w-full flex bottom-10 relative justify-center items-center">
         <div className=" w-[50%] overflow-hidden border border-white/10 h-[70px] flex items-center">
            {/* Scrolling container */}
            <div className="flex animate-marquee whitespace-nowrap">
               {icons.concat(icons).map(({ key, icon: Icon, color }, i) => (
                  <div key={key + i} className="mx-6 flex-shrink-0">
                     <Icon size={60} color={color} />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
