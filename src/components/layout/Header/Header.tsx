import { BiSearch, BiPhone } from "react-icons/bi";
import Time from "../Header/Time";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../ui/Button";

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
      <div className="flex px-4 sm:px-6 md:px-8 lg:px-10 fixed top-4 sm:top-6 md:top-8 lg:top-9 z-10 justify-between items-center w-screen py-1 from-above mix-blend-difference">
         <div className="flex items-center">
            <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg">
               LOCAL<span className="">/</span>
            </p>
            <Time />
            <div className="bg-[#141414] rounded-full size-7 sm:size-8 md:size-9 flex justify-center items-center ms-3 sm:ms-4 md:ms-5 hover:border border-[#B3B3B3]/20 cursor-pointer">
               <BiPhone size={14} color="#ffffff" />
            </div>
         </div>
         <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
            <BiSearch
               size={20}
               color="#ffffff"
               className="sm:w-6 sm:h-6"
            />
            <Button textSize="text-sm" className="px-3 py-2">
               Menu
            </Button>
         </div>
      </div>
   );
}

export default Header;
