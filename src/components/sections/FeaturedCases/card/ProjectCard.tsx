import type { Project } from "../../../../data/projects";
import NoiseOverlay from "../../../ui/NoiseOverlay";

interface ProjectCardProps {
   project: Project;
   textColor?: string;
}

function ProjectCard({ project, textColor = "text-white" }: ProjectCardProps) {
   return (
      <div
         className="bg-red-400 h-full relative project-card w-full aspect-[16/9] overflow-hidden hover:scale-103 transition-transform duration-300 ease-out cursor-pointer"
         style={
            {
               clipPath:
                  "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
            } as React.CSSProperties
         }>
         <img
            src={project.imageSrc}
            alt={project.alt}
            className="object-cover object-center w-full h-full "
         />
         <h3
            className={`${textColor} absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-medium sm:font-semibold sm:text-2xl uppercase font-grotesk tracking-tight mix-blend-difference`}>
            {project.title}
         </h3>
         <NoiseOverlay type="card" />
      </div>
   );
}

export default ProjectCard;
