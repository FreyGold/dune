import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Button from "../../components/ui/Button";
import gsap from "gsap";
import { FaXTwitter } from "react-icons/fa6";

interface FuturisticMenuProps {
   isOpen: boolean;
   onClose: () => void;
}

const FuturisticMenu: React.FC<FuturisticMenuProps> = ({ isOpen, onClose }) => {
   const location = useLocation();
   const menuRef = useRef<HTMLDivElement>(null);
   const overlayRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (isOpen) {
         // Animate menu sliding in from right
         if (menuRef.current) {
            gsap.fromTo(
               menuRef.current,
               { x: "100%" },
               { x: "0%", duration: 0.5, ease: "power3.out" }
            );
         }
         // Animate overlay fade in
         if (overlayRef.current) {
            gsap.fromTo(
               overlayRef.current,
               { opacity: 0 },
               { opacity: 1, duration: 0.3 }
            );
         }
      }
   }, [isOpen]);

   const handleClose = () => {
      // Animate menu sliding out to right
      if (menuRef.current) {
         gsap.to(menuRef.current, {
            x: "100%",
            duration: 0.5,
            ease: "power2.inOut",
         });
      }

      // Animate overlay fade out (slower for smoother effect)
      if (overlayRef.current) {
         gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
               onClose();
            },
         });
      }
   };

   if (!isOpen) return null;

   const menuItems = [
      { path: "/", label: "HOME", number: "01" },
      { path: "/projects", label: "WORKS", number: "02" },
      { path: "/contact", label: "CONTACT", number: "03" },
   ];

   return createPortal(
      <>
         {/* Overlay */}
         <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={handleClose}
         />

         {/* Sidebar Menu */}
         <div
            ref={menuRef}
            className="fixed top-0 right-0 h-full w-full md:w-[35%] lg:w-[30%] bg-black z-50 flex flex-col"
            style={{ borderLeft: "1px solid #222" }}>
            {/* Top Section - Ticker & Close Button */}
            <div className="border-b border-[#222] border-dashed p-4">
               {/* Ticker */}
               <div className="border border-[#252525] rounded-lg overflow-hidden mb-4 py-2 px-3">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                     <div className="flex items-center relative w-4 h-4">
                        <div className="absolute w-3 h-[2px] bg-[#1d1d1f] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute w-3 h-[2px] bg-[#1d1d1f] rotate-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                     </div>
                     <span className="text-[#1d1d1f] text-xs font-mono uppercase font-medium">
                        Light mode coming soon
                     </span>
                     <div className="flex items-center relative w-4 h-4">
                        <div className="absolute w-3 h-[2px] bg-[#1d1d1f] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute w-3 h-[2px] bg-[#1d1d1f] rotate-90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-end">
                  <Button
                     onClick={handleClose}
                     className="hover:bg-[#09f] transition-colors">
                     Close
                  </Button>
               </div>
            </div>

            {/* Middle Section - Menu Items */}
            <div className="flex-1 overflow-y-auto">
               <div className="border border-[#222] border-dashed m-4">
                  {menuItems.map((item, index) => (
                     <React.Fragment key={item.path}>
                        <Link
                           to={item.path}
                           onClick={handleClose}
                           className="group block relative overflow-hidden">
                           <div className="flex items-center justify-between p-6 hover:bg-white/5 transition-all duration-300">
                              {/* Plus Icon */}
                              <div className="flex items-center justify-center w-8 h-8 relative flex-shrink-0">
                                 <div
                                    className={`absolute w-6 h-[2px] transition-all duration-300 ${
                                       location.pathname === item.path
                                          ? "bg-white"
                                          : "bg-[#707070] group-hover:bg-white"
                                    }`}></div>
                                 <div
                                    className={`absolute w-6 h-[2px] rotate-90 transition-all duration-300 ${
                                       location.pathname === item.path
                                          ? "bg-white"
                                          : "bg-[#707070] group-hover:bg-white"
                                    }`}></div>
                              </div>

                              {/* Text with overlay effect */}
                              <div className="flex-1 relative px-6">
                                 <h3
                                    className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight transition-colors duration-300 font-['Space_Grotesk'] flex items-start gap-1 ${
                                       location.pathname === item.path
                                          ? "text-white"
                                          : "text-[#707070] group-hover:text-white"
                                    }`}
                                    style={{
                                       letterSpacing: "-0.8px",
                                       lineHeight: "54px",
                                    }}>
                                    {item.label}
                                    <span
                                       className={`font-mono uppercase transition-colors duration-300 ${
                                          location.pathname === item.path
                                             ? "text-white"
                                             : "text-[#707070] group-hover:text-white"
                                       }`}
                                       style={{
                                          fontSize: "0.3em",
                                          verticalAlign: "super",
                                          lineHeight: "1",
                                       }}>
                                       {item.number}
                                    </span>
                                 </h3>
                              </div>
                           </div>
                        </Link>
                        {index < menuItems.length - 1 && (
                           <div className="border-t border-[#222] border-dashed"></div>
                        )}
                     </React.Fragment>
                  ))}
               </div>
            </div>

            {/* Bottom Section - Social Links */}
            <div className="border-t border-[#222] border-dashed">
               <div className="grid grid-cols-3">
                  <a
                     href="https://www.linkedin.com/in/ahmed-tawfik-458353165/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group relative border-r border-[#222] border-dashed p-6 hover:bg-white/5 transition-all duration-300">
                     <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-mono">
                           LinkedIn
                        </span>
                        <div className="w-full h-[1px] bg-[#1d1d1f] group-hover:bg-white transition-colors"></div>
                        <div className="transform group-hover:rotate-45 transition-transform duration-300">
                           <FaLinkedin className="text-white text-lg" />
                        </div>
                     </div>
                  </a>
                  <a
                     href="https://github.com/FreyGold"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group relative border-r border-[#222] border-dashed p-6 hover:bg-white/5 transition-all duration-300">
                     <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-mono">
                           GitHub
                        </span>
                        <div className="w-full h-[1px] bg-[#1d1d1f] group-hover:bg-white transition-colors"></div>
                        <div className="transform group-hover:rotate-45 transition-transform duration-300">
                           <FaGithub className="text-white text-lg" />
                        </div>
                     </div>
                  </a>
                  <a
                     href="https://x.com/TeslaLeftArm"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group relative p-6 hover:bg-white/5 transition-all duration-300">
                     <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-mono">
                           Twitter
                        </span>
                        <div className="w-full h-[1px] bg-[#1d1d1f] group-hover:bg-white transition-colors"></div>
                        <div className="transform group-hover:rotate-45 transition-transform duration-300">
                           <FaXTwitter className="text-white text-lg" />
                        </div>
                     </div>
                  </a>
               </div>
            </div>
         </div>
      </>,
      document.body
   );
};

export default FuturisticMenu;
