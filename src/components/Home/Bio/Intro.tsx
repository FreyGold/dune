import CircularText from "../../CircularText";

function Intro() {
   return (
      <div className="mt-8 md:mt-12.5 grid grid-cols-1 xl:grid-cols-[1.5fr_1.05fr] gap-8 xl:gap-0 uppercase **:leading-[1.5]">
         <div className="relative flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-8">
            <div className="hidden xl:block font-mono">
               <CircularText
                  text="I*Love*Building*Things*"
                  onHover="speedUp"
                  spinDuration={20}
                  className="font-grotesk"
               />
            </div>
            <img
               src="/bio2.png"
               alt=""
               className="hidden xl:block absolute left-0 bottom-0 lg:left-0 lg:bottom-0"
            />
         </div>
         <div>
            <div className="mb-15">
               <h2 className="mb-6 font-grotesk text-xl md:text-2xl font-bold">
                  ABOUT ME
               </h2>
               <p className="font-roboto text-[#A3A3A3] text-base md:text-lg lg:text-xl">
                  I'm a passionate web developer focused on creating beautiful,
                  functional web applications through clean, efficient web
                  development. I study Computer Science and Engineering,
                  building a strong foundation in core concepts and software
                  engineering principles.
               </p>
            </div>
            <div>
               <h2 className="mb-6 font-grotesk text-xl md:text-2xl font-bold">
                  SKILLS & EXPERIENCE
               </h2>
               <p className="font-roboto text-[#A3A3A3] text-base md:text-lg lg:text-xl">
                  I love diving into challenging problems and figuring out the
                  best way to solve them, always learning from feedback along
                  the way. I've gained experience through hands-on projects in
                  my courses that sharpened my analytical skills, plus a
                  three-month internship at{" "}
                  <span className="font-semibold">@Buguard LLC</span> where I
                  worked on real client projects alongside experienced
                  developers and delivered creative solutions.
               </p>
            </div>
         </div>
      </div>
   );
}

export default Intro;
