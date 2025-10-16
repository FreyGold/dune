import ButtonFillAnimation from "./ButtonFillAnimation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
   children: React.ReactNode;
   textSize?: string;
   className?: string;
   variant?: 'default' | 'small' | 'large' | 'selected';
   backgroundColor?: string;
}

function Button({
   children,
   textSize = "text-xs sm:text-sm",
   className = "",
   variant = 'default',
   backgroundColor,
   ...props
}: ButtonProps) {
   const getResponsiveClasses = () => {
      const baseClasses = "relative font-bold font-grotesk uppercase text-black leading-none cursor-pointer";
      const variantClasses = {
         default: "px-4 py-2 sm:px-5 sm:py-2.5",
         small: "px-3 py-1.5 sm:px-4 sm:py-2",
         large: "px-6 py-3 sm:px-8 sm:py-4",
         selected: "px-3 py-1.5 sm:px-4 sm:py-2"
      };
      return `${baseClasses} ${textSize} ${variantClasses[variant]} ${className}`;
   };
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
         className={getResponsiveClasses()}
         {...props}>
         {children}
      </button>
   );

   return (
      <ButtonFillAnimation
         clipPath={clipPathValue}
         baseColor={backgroundColor || "#ffffff"}
         variant={variant}>
         {button}
      </ButtonFillAnimation>
   );
}

export default Button;
