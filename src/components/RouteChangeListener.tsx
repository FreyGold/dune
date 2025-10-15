import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGSAPContext } from "../contexts/GSAPContext";

export const RouteChangeListener = () => {
   const location = useLocation();
   const { refreshScrollers, smoother } = useGSAPContext();

   useLayoutEffect(() => {
      // Hide content immediately
      document.body.classList.remove("loaded");

      if (smoother.current) {
         smoother.current.scrollTo(0, false);
         window.scrollTo(0, 0);
      }
   }, [location.pathname, smoother]);

   useEffect(() => {
      const refreshTimer = setTimeout(() => {
         refreshScrollers();

         requestAnimationFrame(() => {
            document.body.classList.add("loaded");
         });
      }, 100);

      return () => clearTimeout(refreshTimer);
   }, [location.pathname, refreshScrollers, smoother]);

   return null;
};
