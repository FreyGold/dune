import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./components/layout/RootLayout";
import Home from "./components/sections/Home";

// Lazy load projects pages for better performance
const Projects = lazy(() => import("./components/sections/Projects/Projects"));
const ProjectDetail = lazy(() => import("./components/sections/Projects/ProjectDetail"));

export default function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path="/" element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path="projects" element={
                     <Suspense fallback={<div className="h-screen bg-black" />}>
                        <Projects />
                     </Suspense>
                  } />
                  <Route path="projects/:projectId" element={
                     <Suspense fallback={<div className="h-screen bg-black" />}>
                        <ProjectDetail />
                     </Suspense>
                  } />
               </Route>
            </Routes>
         </div>
      </Router>
   );
}
