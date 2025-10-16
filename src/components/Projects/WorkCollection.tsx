import { projects } from "../../data/projects";
import ProjectCard from "./card/ProjectCard";

function WorkCollection() {
   return (
      <div className="mt-18 md:mt-28 lg:mt-40 grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
         {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
         ))}
      </div>
   );
}

export default WorkCollection;
