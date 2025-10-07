import ButtonFillAnimation from "./ButtonFillAnimation";

interface ButtonProps {
   children: React.ReactNode;
   textSize?: string;
   className?: string;
}

function Button({
   children,
   textSize = "text-xs sm:text-sm",
   className = "px-5 py-2.5",
}: ButtonProps) {
   // Corner size based on text size
   const getCornerSize = (textSizeClass: string) => {
      switch (textSizeClass) {
         case "text-xs":
            return "w-[6px] h-[6px] sm:w-[8px] sm:h-[8px]";
         case "text-sm":
            return "w-[8px] h-[8px] sm:w-[10px] sm:h-[10px]";
         case "text-base":
            return "w-[10px] h-[10px] sm:w-[12px] sm:h-[12px]";
         case "text-lg":
            return "w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]";
         default:
            return "w-[8px] h-[8px] sm:w-[10px] sm:h-[10px]";
      }
   };

   const cornerSizeClass = getCornerSize(textSize);

   return (
      <ButtonFillAnimation>
         <button
            className={`relative font-bold font-grotesk uppercase text-black leading-none overflow-hidden cursor-pointer  ${textSize} ${className}`}>
            {children}
            <span
               className={`absolute top-0 right-0 bg-black [clip-path:polygon(100%_0,0_0,100%_100%)] ${cornerSizeClass}`}></span>
            <span
               className={`absolute bottom-0 left-0 bg-black [clip-path:polygon(0_100%,0_0,100%_100%)] ${cornerSizeClass}`}></span>
         </button>
      </ButtonFillAnimation>
   );
}

export default Button;
