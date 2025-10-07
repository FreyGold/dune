import Exprience from "./Exprience";
import Intro from "./Intro";

function About() {
   return (
      <div className="min-w-screen min-h-screen bg-[#000000] grid grid-cols-2 text-white">
         <div className="flex flex-col justify-start items-center ps-4 p-20 pt-30">
            <h1 className="text-6xl font-bold mb-4">
               I build performant web experiences with TypeScript and React.
            </h1>
         </div>
         <div className="flex flex-col items-center justify-center border-r pe-10 pt-80 py-30 border-white/10 gap-10">
            <Intro />
            <Exprience />
         </div>
      </div>
   );
}

export default About;
