function ProjectCard() {
   return (
      <div 
         className="bg-red-400 w-full h-full relative"
         style={{
            clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))"
         } as React.CSSProperties}
      >
      </div>
   );
}

export default ProjectCard;
