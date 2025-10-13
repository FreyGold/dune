function Footer() {
   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <div className="px-10 uppercase">
         <div className="bg-[#A3A3A3]/20 h-[1px] mt-22.5 mb-25 mx-15 rounded-full"></div>

         <h1 className="font-grotesk font-bold text-[10.625rem] text-center leading-[100%]">
            Ahmed Tawfik
         </h1>
         <div className="px-8.5 flex justify-between">
            <a
               href="https://www.framer.com/marketplace/templates/dune/"
               target="_blank"
               rel="noopener noreferrer">
               ©2024 MANDRO DESIGNS
            </a>
            <a onClick={scrollToTop} style={{ cursor: "pointer" }}>
               Go Back To Top
            </a>
         </div>
      </div>
   );
}

export default Footer;
