import { projects } from "../../../../data/projects";
import ProjectCard from "./ProjectCard";

function WorkCollection() {
   return (
      <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-6 perspective-1000">
         <ProjectCard project={projects[0]} />
         <ProjectCard project={projects[1]} />
         <ProjectCard project={projects[2]} />
         <ProjectCard project={projects[3]} />
      </div>
   );
}

export default WorkCollection;
