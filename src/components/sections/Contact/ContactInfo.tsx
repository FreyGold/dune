import { useState } from "react";

function ContactInfo() {
   const [copiedPhone, setCopiedPhone] = useState(false);
   const [copiedEmail, setCopiedEmail] = useState(false);
   const [showTooltip, setShowTooltip] = useState<"phone" | "email" | null>(
      null
   );

   const copyToClipboard = async (text: string, type: "phone" | "email") => {
      try {
         await navigator.clipboard.writeText(text);
         if (type === "phone") {
            setCopiedPhone(true);
            setShowTooltip("phone");
            setTimeout(() => {
               setCopiedPhone(false);
               setShowTooltip(null);
            }, 1000);
         } else {
            setCopiedEmail(true);
            setShowTooltip("email");
            setTimeout(() => {
               setCopiedEmail(false);
               setShowTooltip(null);
            }, 1000);
         }
      } catch (err) {
         console.error("Failed to copy: ", err);
      }
   };

   const handleMouseEnter = (type: "phone" | "email") => {
      if (!copiedPhone && !copiedEmail) {
         setShowTooltip(type);
      }
   };

   const handleMouseLeave = () => {
      if (!copiedPhone && !copiedEmail) {
         setShowTooltip(null);
      }
   };

   return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-15">
         {/* Top Line */}
         <div className="bg-[#A3A3A3]/20 h-[1px] mt-10 md:mt-16 lg:mt-22.5 mb-8 md:mb-16 lg:mb-25 rounded-full mx-auto"></div>

         {/* Inner Content - Perfectly Centered Grid */}
         <div className="uppercase">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 justify-items-center">
               {/* Section 1: FOLLOW ME */}
               <div className="space-y-3 md:space-y-4 text-center lg:text-left w-full">
                  <h3 className="font-roboto text-sm md:text-base lg:text-[1.125rem] font-medium text-[#A3A3A3]  transition-colors no-underline block">
                     FOLLOW ME
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                     <a
                        href="https://x.com/TeslaLeftArm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block m-0 font-grotesk text-lg md:text-xl font-bold uppercase text-white">
                        Twitter / X
                     </a>
                     <a
                        href="https://www.linkedin.com/in/ahmed-tawfik-458353165/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-grotesk text-lg md:text-xl font-bold uppercase text-white">
                        LinkedIn
                     </a>
                  </div>
               </div>

               {/* Section 2: CURRENT LOCATION */}
               <div className="space-y-3 md:space-y-4 text-center lg:text-left w-full ">
                  <h3 className="font-roboto text-sm md:text-base lg:text-[1.125rem] font-medium text-[#A3A3A3]  transition-colors no-underline block">
                     CURRENT LOCATION
                  </h3>
                  <div className="space-y-1 md:space-y-2">
                     <p className="font-grotesk text-lg md:text-xl font-bold uppercase text-white m-0">
                        Shebin Elkoum
                     </p>
                     <p className="font-grotesk text-lg md:text-xl font-bold uppercase text-white m-0">
                        Menofia, Egypt
                     </p>
                  </div>
               </div>

               {/* Section 3: Phone */}
               <div className="space-y-3 md:space-y-4 text-center lg:text-left w-full ">
                  <h3 className="font-roboto text-sm md:text-base lg:text-[1.125rem] font-medium text-[#A3A3A3]  transition-colors no-underline block">
                     Phone
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                     <div className="relative">
                        <div className="relative">
                           <div
                              onClick={() =>
                                 copyToClipboard("+201122034842", "phone")
                              }
                              onMouseEnter={() => handleMouseEnter("phone")}
                              onMouseLeave={handleMouseLeave}
                              className="font-grotesk text-lg md:text-xl font-bold uppercase text-white cursor-pointer hover:text-gray-300 transition-colors inline-block">
                              <span className="block text-center lg:text-left">
                                 +20 112 203 4842
                              </span>
                           </div>
                           {showTooltip === "phone" && (
                              <div className="absolute top-full  transform mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap z-10 transition-opacity duration-200">
                                 {copiedPhone ? "Copied!" : "Click to copy"}
                                 <div className="absolute bottom-full transform  border-4 border-transparent border-b-gray-800"></div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Section 4: EMAIL me */}
               <div className="space-y-3 md:space-y-4 text-center lg:text-left w-full ">
                  <h3 className="font-roboto text-sm md:text-base lg:text-[1.125rem] font-medium text-[#A3A3A3]  transition-colors no-underline block">
                     EMAIL me
                  </h3>
                  <div className="space-y-2 md:space-y-3 relative">
                     <div className="relative w-full">
                        <div className="relative">
                           <div
                              onClick={() =>
                                 copyToClipboard(
                                    "ahmedtawfik833@gmail.com",
                                    "email"
                                 )
                              }
                              onMouseEnter={() => handleMouseEnter("email")}
                              onMouseLeave={handleMouseLeave}
                              className="font-grotesk text-lg md:text-xl font-bold uppercase text-white break-all cursor-pointer hover:text-gray-300 transition-colors inline-block">
                              <span className="block text-center lg:text-left w-full">
                                 ahmedtawfik833@gmail.com
                              </span>
                           </div>
                           {showTooltip === "email" && (
                              <div className="absolute top-full transform  mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap z-10 transition-opacity duration-200">
                                 {copiedEmail ? "Copied!" : "Click to copy"}
                                 <div className="absolute bottom-full transform  border-4 border-transparent border-b-gray-800 "></div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ContactInfo;
