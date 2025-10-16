import { BiSearch, BiPhone } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Time from "./Time";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../components/ui/Button";
import { useState, useRef } from "react";
import FuturisticMenu from "./FuturisticMenu";

function Header() {
   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const headerRef = useRef<HTMLDivElement>(null);

   useGSAP(
      () => {
         if (headerRef.current) {
            gsap.from(headerRef.current, {
               y: -100,
               opacity: 0,
               duration: 0.5,
               delay: 0.1,
               ease: "power2.out",
            });
         }
      },
      { scope: headerRef }
   );

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <>
         <div
            ref={headerRef}
            className="flex px-4 sm:px-6 md:px-8 lg:px-10 fixed top-4 sm:top-6 md:top-8 lg:top-9 z-10 justify-between items-center w-screen py-1 mix-blend-difference font-roboto ">
            <div className="flex items-center">
               <Link
                  to="/"
                  className="text-[#B3B3B3] text-sm sm:text-base md:text-lg hover:text-white transition-colors">
                  LOCAL<span className="">/</span>
               </Link>
               <Time />
               <Link to="/contact">
                  <div className="bg-[#141414] rounded-full size-7 sm:size-8 md:size-9 flex justify-center items-center ms-3 sm:ms-4 md:ms-5 hover:border border-[#B3B3B3]/20 cursor-pointer">
                     <BiPhone size={14} color="#ffffff" />
                  </div>
               </Link>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
               <BiSearch size={20} color="#ffffff" className="sm:w-6 sm:h-6" />
               <Button
                  textSize="text-xs sm:text-sm"
                  variant="small"
                  onClick={toggleMenu}
                  className={`${
                     location.pathname === "/projects"
                        ? "bg-white text-black"
                        : ""
                  }`}>
                  Menu
               </Button>
            </div>
         </div>

         {/* Futuristic Menu Component */}
         <FuturisticMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
         />
      </>
   );
}

export default Header;
