function ContactInfo() {
   return (
      <div className="w-full px-15">
         {/* Top Line */}
         <div className="bg-[#A3A3A3]/20 h-[1px] mt-22.5 mb-25 rounded-full mx-auto"></div>

         {/* Inner Content - Perfectly Centered Grid */}
         <div className="uppercase">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
               {/* Section 1: FOLLOW ME */}
               <div className="space-y-4 w-full">
                  <h3 className="font-roboto lg:text-[1.125rem] font-medium text-[#A3A3A3] hover:text-white transition-colors no-underline block">
                     FOLLOW ME
                  </h3>
                  <div className="space-y-3">
                     <a
                        href="https://x.com/TeslaLeftArm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block m-0 font-grotesk text-xl font-bold uppercase text-white">
                        Twitter / X
                     </a>
                     <a
                        href="https://www.linkedin.com/in/ahmed-tawfik-458353165/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-grotesk text-xl font-bold uppercase text-white">
                        LinkedIn
                     </a>
                  </div>
               </div>

               {/* Section 2: CURRENT LOCATION */}
               <div className="space-y-4 text-center lg:text-left w-full ">
                  <h3 className="font-roboto lg:text-[1.125rem] font-medium text-[#A3A3A3] hover:text-white transition-colors no-underline block">
                     CURRENT LOCATION
                  </h3>
                  <div className="space-y-2">
                     <p className="font-grotesk text-xl font-bold uppercase text-white m-0">
                        Shebin Elkoum
                     </p>
                     <p className="font-grotesk text-xl font-bold uppercase text-white m-0">
                        Menofia, Egypt
                     </p>
                  </div>
               </div>

               {/* Section 3: Phone */}
               <div className="space-y-4 text-center lg:text-left w-full ">
                  <h3 className="font-roboto lg:text-[1.125rem] font-medium text-[#A3A3A3] hover:text-white transition-colors no-underline block">
                     Phone
                  </h3>
                  <div className="space-y-4">
                     <div>
                        <a
                           href="tel:+201122034842"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="font-grotesk text-xl font-bold uppercase text-white">
                           <span className="block">+20 112 203 4842</span>
                        </a>
                     </div>
                  </div>
               </div>

               {/* Section 4: EMAIL me */}
               <div className="space-y-4 text-center lg:text-left w-full ">
                  <h3 className="font-roboto lg:text-[1.125rem] font-medium text-[#A3A3A3] hover:text-white transition-colors no-underline block">
                     EMAIL me
                  </h3>
                  <div className="space-y-3 ">
                     <a
                        href="mailto:ahmedtawfik833@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-grotesk text-xl font-bold uppercase text-white break-all">
                        ahmedtawfik833@gmail.com
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ContactInfo;
