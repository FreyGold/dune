import Time from "../Header/Time";
import ButtonFillAnimation from "../../ui/ButtonFillAnimation";
import { MagnifyingGlass, Phone } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Header() {
   useGSAP(() => {
      gsap.from(".from-above", {
         y: -100,
         opacity: 0,
         duration: 0.5,
         delay: 0.1,
         ease: "power2.out",
      });
   });
   return (
      <div className="flex px-4 sm:px-6 md:px-8 lg:px-10 fixed top-4 sm:top-6 md:top-8 lg:top-9 z-10 justify-between items-center w-screen py-1 from-above">
         <div className="flex items-center">
            <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg">
               LOCAL<span className="">/</span>
            </p>
            <Time />
            <div className="bg-[#141414] rounded-full size-7 sm:size-8 md:size-9 flex justify-center items-center ms-3 sm:ms-4 md:ms-5 hover:border border-[#B3B3B3]/20 cursor-pointer">
               <Phone size={14} color="#ffffff" weight="fill" />
            </div>
         </div>
         <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            <MagnifyingGlass size={20} color="#ffffff" weight="bold" className="sm:w-6 sm:h-6" />
            <ButtonFillAnimation>
               <button className="relative font-bold font-grotesk uppercase text-black leading-none overflow-hidden cursor-pointer px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm">
                  MENU
                  <span className="absolute top-0 right-0 w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-black [clip-path:polygon(100%_0,0_0,100%_100%)]"></span>
                  <span className="absolute bottom-0 left-0 w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-black [clip-path:polygon(0_100%,0_0,100%_100%)]"></span>
               </button>
            </ButtonFillAnimation>
         </div>
      </div>
   );
}

export default Header;
