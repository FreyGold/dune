import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { projects } from "../../data/projects";
import ProjectCard from "./card/ProjectCard";

function WorkCollection() {
   const containerRef = useRef<HTMLDivElement>(null);

   useGSAP(
      () => {
         if (containerRef.current) {
            gsap.from(containerRef.current, {
               y: 200,
               opacity: 0,
            });
         }
      },
      { scope: containerRef }
   );

   return (
      <div
         ref={containerRef}
         className="mt-18 md:mt-28 lg:mt-40 grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
         {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
         ))}
      </div>
   );
}

export default WorkCollection;
