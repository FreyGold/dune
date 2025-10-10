function NoiseOverlay({ type = "image" }: { type?: string }) {
   const inset =
      type === "card"
         ? "-left-40 -top-20"
         : "-left-40 -top-40 md:-left-60 md:-top-60 lg:-left-80 lg:-top-80";
   return (
      <div
         className={`absolute inset-0 w-[170%] h-[170%] ${inset}  bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] opacity-25 mix-blend-overlay animate-grain overflow-x-clip`}></div>
   );
}

export default NoiseOverlay;
