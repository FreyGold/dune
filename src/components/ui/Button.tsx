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
   const getCornerSize = (textSizeClass: string) => {
      switch (textSizeClass) {
         case "text-xs":
            return 6;
         case "text-sm":
            return 8;
         case "text-base":
            return 10;
         case "text-lg":
            return 12;
         default:
            return 8;
      }
   };

   const cornerSize = getCornerSize(textSize);

   const clipPathValue = `polygon(
      0 0,
      calc(100% - ${cornerSize}px) 0,
      100% ${cornerSize}px,
      100% 100%,
      ${cornerSize}px 100%,
      0 calc(100% - ${cornerSize}px)
   )`;

   const button = (
      <button
         className={`relative font-bold font-grotesk uppercase text-black leading-none cursor-pointer ${textSize} ${className}`}>
         {children}
      </button>
   );

   return (
      <ButtonFillAnimation clipPath={clipPathValue}>
         {button}
      </ButtonFillAnimation>
   );
}

export default Button;
