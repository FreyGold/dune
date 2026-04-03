function Footer() {
   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 uppercase">
         <div className="bg-[#A3A3A3]/20 h-[1px] mt-10 md:mt-16 lg:mt-22.5 mb-8 md:mb-16 lg:mb-25 mx-4 sm:mx-6 md:mx-8 lg:mx-15 rounded-full"></div>

         <h1 className="font-grotesk font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10.625rem] text-center leading-[100%]">
            Ahmed Tawfik
         </h1>

         {/* Source code callout */}
         <div className="flex justify-center mt-6 md:mt-8">
            <a
               href="https://github.com/FreyGold/dune"
               target="_blank"
               rel="noopener noreferrer"
               className="font-roboto text-sm sm:text-base hover:text-[#999999] transition-colors duration-300 uppercase tracking-wide border-2 border-white/15 px-4 py-1.5 rounded-full relative"
            >
               &lt;/&gt; Not Framer — Built from scratch with React · View Source
            </a>
         </div>

         <div className="px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 py-6 md:py-8 font-roboto text-lg">
           
            <a
               href="https://www.framer.com/marketplace/templates/dune/"
               target="_blank"
               rel="noopener noreferrer"
               className="text-sm md:text-base hover:text-[#999999] transition-colors ">
               Designed By: <span className="underline underline-offset-2">Mandro Designs</span>
            </a>
            <a
               onClick={scrollToTop}
               className="text-sm md:text-base cursor-pointer hover:text-gray-300 transition-colors">
               Go Back To Top
            </a>
         </div>
      </div>
   );
}

export default Footer;
