import { useEffect, useState } from "react";

function Time() {
   const [time, setTime] = useState(new Date());

   useEffect(() => {
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
   }, []);

   return (
      <p className="tracking-wider text-white font-semibold text-sm sm:text-base md:text-lg">
         {time.toLocaleTimeString([], { hourCycle: "h24" })}
      </p>
   );
}

export default Time;
