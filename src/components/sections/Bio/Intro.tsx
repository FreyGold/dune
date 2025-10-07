import CircularText from "../../CircularText";

function Intro() {
   return (
      <div className="mt-12.5 grid grid-cols-[1.5fr_1.05fr] uppercase **:leading-[1.5]">
         <div className="relative flex items-center justify-center">
            <div className="font-mono">
               <CircularText
                  text="FRONTEND*DEVELOPER*"
                  onHover="speedUp"
                  spinDuration={20}
                  className="font-grotesk"
               />
            </div>
            <img src="/bio2.png" alt="" className="absolute left-0 bottom-0" />
         </div>
         <div>
            <div className="mb-15">
               <h2 className="mb-6 font-grotesk text-2xl font-bold">
                  ABOUT ME
               </h2>
               <p className="font-roboto text-[#A3A3A3] text-xl">
                  I'm a passionate software developer focused on creating
                  beautiful, functional user experiences through clean,
                  efficient web development. I study Computer Science and
                  Engineering, building a strong foundation in core concepts and
                  software engineering principles.
               </p>
            </div>
            <div>
               <h2 className="mb-6 font-grotesk text-2xl font-bold">
                  SKILLS & EXPERIENCE
               </h2>
               <p className="font-roboto text-[#A3A3A3] text-xl">
                  I thrive on tackling complex problems with a structured,
                  user-centered approach—breaking them into manageable steps,
                  prioritizing efficiency, and iterating based on feedback. My
                  experience includes project-based courses where I honed
                  analytical thinking and a three-month internship at{" "}
                  <span className="font-semibold">@Buguard</span>, collaborating
                  on real-world challenges under senior guidance to deliver
                  innovative solutions.
               </p>
            </div>
         </div>
      </div>
   );
}

export default Intro;
