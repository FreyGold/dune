import WorkCollection from "./card/WorkCollection";

function Featured() {
   return (
      <div className="h-full px-10 relative bg-black">
         <div className="flex lg:justify-end">
            <h1 className="font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-[6.25rem] font-bold uppercase [word-spacing:-0.1rem] tracking-tight">
               Featured Cases
            </h1>
         </div>
         <div className="mt-6">
            <p className="text-xl font-roboto text-[#A3A3A3] uppercase max-w-[570px] leading-[1.75]">
               My creative spirit comes alive in the digital realm. With nimble
               fingers flying across the keyboard, I craft clear experiences out
               of nothing but ones and zeroes.
            </p>
         </div>
         <WorkCollection />
      </div>
   );
}

export default Featured;
