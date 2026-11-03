import { projects } from "../../../../data/projects";
import ProjectCard from "./ProjectCard";

function WorkCollection() {
   return (
      <div className="mt-10 md:mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-6 perspective-1000">
         {projects.filter((project) => project.featured).map((project) => (
            <ProjectCard key={project.id} project={project} />
         ))}
      </div>
   );
}

export default WorkCollection;
