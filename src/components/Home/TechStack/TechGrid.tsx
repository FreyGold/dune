import React, { useMemo } from "react";
import { getAllTechnologies } from "../../../data/techStack";
import TechItem from "./TechItem";

function TechGrid() {
   // memoize technologies to keep stable reference between renders
   const technologies = useMemo(() => getAllTechnologies(), []);

   // use fixed auto-rows so every grid cell has the same height and items fit cleanly
   return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 items-stretch justify-items-center auto-rows-[9rem] sm:auto-rows-[10rem] md:auto-rows-[11rem] lg:auto-rows-[12rem]">
         {technologies.map((tech) => (
            <TechItem key={tech.name} tech={tech} />
         ))}
      </div>
   );
}

export default React.memo(TechGrid);
