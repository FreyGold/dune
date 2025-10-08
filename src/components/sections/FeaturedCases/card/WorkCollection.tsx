import ProjectCard from "./ProjectCard";

function WorkCollection() {
   return (
      <div className="mt-40 grid grid-cols-2 grid-rows-2 gap-6 h-[1144px]">
         <ProjectCard />
         <ProjectCard />
         <ProjectCard />
         <ProjectCard />
      </div>
   );
}

export default WorkCollection;
