import { BiSearch, BiPhone, BiArrowBack } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Time from "./Time";
import Button from "../../components/ui/Button";
import { useState, useRef, useEffect } from "react";
import FuturisticMenu from "./FuturisticMenu";

function Header() {
   const location = useLocation();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);
   const [isInitialLoad, setIsInitialLoad] = useState(true);
   const headerRef = useRef<HTMLDivElement>(null);

   // Check if we're on a project detail page
   const isProjectDetailPage = /^\/projects\/[^/]+$/.test(location.pathname);

   // Reset animation when navigating to new routes
   useEffect(() => {
      setIsInitialLoad(true);
      setIsHeaderVisible(true);
      setLastScrollY(0);
   }, [location.pathname]);

   // Scroll-based header animation
   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;

         if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down and past threshold - hide header
            setIsHeaderVisible(false);
         } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show header
            setIsHeaderVisible(true);
         }

         setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [lastScrollY]);

   // Handle initial load animation
   useEffect(() => {
      if (isInitialLoad) {
         const timer = setTimeout(() => {
            setIsInitialLoad(false);
         }, 300); // Match the GSAP delay + duration

         return () => clearTimeout(timer);
      }
   }, [isInitialLoad]);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <>
         <div
            ref={headerRef}
            className={`flex px-4 sm:px-6 md:px-8 lg:px-10 fixed top-4 sm:top-6 md:top-8 lg:top-9 z-10 justify-between items-center w-screen py-1 mix-blend-difference font-roboto transition-transform duration-500 ease-out ${
               isInitialLoad
                  ? "-translate-y-full opacity-0"
                  : isHeaderVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-25 opacity-100"
            }`}>
            <div className="flex items-center">
               {isProjectDetailPage ? (
                  <Link to="/projects" className="">
                     <Button
                        textSize="text-sm"
                        variant="small"
                        className="flex items-center gap-2 ">
                        <BiArrowBack />
                        Return
                     </Button>
                  </Link>
               ) : (
                  <>
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
                  </>
               )}
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
