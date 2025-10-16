import type { Project } from "../../../../data/projects";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
   project: Project;
   textColor?: string;
}

function ProjectCard({ project, textColor = "text-white" }: ProjectCardProps) {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/projects/${project.id}`);
   };

   return (
      <div
         className="bg-red-400 h-full relative project-card w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden hover:scale-105 sm:hover:scale-103 transition-transform duration-300 ease-out cursor-pointer"
         style={
            {
               clipPath:
                  "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
            } as React.CSSProperties
         }
         onClick={handleClick}>
         <img
            src={project.imageSrc}
            alt={project.alt}
            className="object-cover object-center w-full h-full transition-transform duration-300 hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
         <h3
            className={`${textColor} absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 font-medium sm:font-semibold text-lg sm:text-xl md:text-2xl uppercase font-grotesk tracking-tight mix-blend-difference`}>
            {project.title}
         </h3>
      </div>
   );
}

export default ProjectCard;
