import type { Project } from "../../../data/projects";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

interface ProjectCardProps {
   project: Project;
   textColor?: string;
}

function ProjectCard({ project, textColor = "text-white" }: ProjectCardProps) {
   const navigate = useNavigate();
   const videoRef = useRef<HTMLVideoElement>(null);

   const handleClick = () => {
      if (project.comingSoon) {
         return; // Don't navigate for coming soon projects
      }
      navigate(`/projects/${project.id}`);
   };

   // Use dedicated video source if available
   const videoFile = project.videoSrc;

   // Handle video hover interactions
   const handleMouseEnter = () => {
      const video = videoRef.current;
      if (video && videoFile) {
         video.playbackRate = 2;
         video.play().catch(console.error);
      }
   };

   const handleMouseLeave = () => {
      const video = videoRef.current;
      if (video && videoFile) {
         video.pause();
         video.currentTime = 0; // Reset to first frame
      }
   };

   return (
      <div
         className={`h-full relative project-card w-full overflow-hidden transition-transform duration-300 ease-out ${
            project.comingSoon
               ? "cursor-default opacity-75 blur-sm"
               : "hover:scale-105 sm:hover:scale-103 cursor-pointer"
         }`}
         style={
            {
               aspectRatio: "16 / 9",
               clipPath:
                  "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
            } as React.CSSProperties
         }
         onClick={handleClick}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         data-coming-soon={project.comingSoon}>
         {videoFile ? (
            <video
               ref={videoRef}
               src={videoFile}
               loop
               muted
               playsInline
               preload="metadata"
               className="absolute inset-0 object-cover object-center w-full h-full"
            />
         ) : project.imageSrc ? (
            <img
               src={project.imageSrc}
               alt={project.alt}
               className={`absolute inset-0 object-center w-full h-full ${project.imageFit === "contain" ? "object-contain bg-neutral-900" : "object-cover"}`}
            />
         ) : (
            <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-neutral-800 px-6 sm:px-10">
               <p className="text-xs uppercase tracking-widest text-neutral-400">{project.technologies.slice(0, 3).join(" / ")}</p>
               <p className="max-w-md text-base text-neutral-300 sm:text-xl">{project.description}</p>
            </div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
         <h3
            className={`${textColor} absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 font-medium sm:font-semibold text-lg sm:text-xl md:text-2xl uppercase font-grotesk tracking-tight mix-blend-difference`}>
            {project.comingSoon ? "Soon To Come" : project.title}
         </h3>
      </div>
   );
}

export default ProjectCard;
