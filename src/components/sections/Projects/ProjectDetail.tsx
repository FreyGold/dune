import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "../../../data/projects";
import NoiseOverlay from "../../ui/NoiseOverlay";
import Button from "../../ui/Button";
import { BiArrowBack, BiLinkExternal, BiLogoGithub } from "react-icons/bi";

function ProjectDetail() {
   const { projectId } = useParams<{ projectId: string }>();
   const project = projects.find((p) => p.id === projectId);

   // Scroll to top when component mounts
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   if (!project) {
      return (
         <div className="min-h-screen bg-black text-white flex items-center justify-center pt-40 animate-fade-in">
            <div className="text-center">
               <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
               <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-white transition-colors">
                  <BiArrowBack className="" />
                  Back to Projects
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-black text-white pt-40 animate-fade-in">
         {/* Hero Section */}
         <div className="relative h-screen flex items-center justify-center">
            <div
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: `url(${project.imageSrc})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <NoiseOverlay type="hero" />

            <div className="relative z-10 text-center px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 max-w-4xl mx-auto">
               <div className="mb-4">
                  <span className="inline-block text-sm text-[#A3A3A3] uppercase tracking-wider mb-2">
                     {project.category} • {project.year}
                  </span>
               </div>
               <h1 className="font-grotesk text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase [word-spacing:-0.1rem] tracking-tight mb-6">
                  {project.title}
               </h1>
               <p className="text-lg sm:text-xl md:text-2xl text-[#A3A3A3] leading-relaxed max-w-3xl mx-auto">
                  {project.longDescription}
               </p>

               {/* Action Buttons */}
               <div className="flex flex-wrap gap-4 justify-center mt-8">
                  {project.liveUrl && (
                     <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        <BiLinkExternal />
                        Live Demo
                     </a>
                  )}
                  {project.githubUrl && (
                     <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors">
                        <BiLogoGithub />
                        View Code
                     </a>
                  )}
               </div>
            </div>

            {/* Back Button */}
            <Link to="/projects" className="absolute top-8 left-8">
               <Button
                  textSize="text-sm"
                  variant="small"
                  className="flex items-center gap-2 ">
                  <BiArrowBack />
                  Return
               </Button>
            </Link>
         </div>

         {/* Project Details */}
         <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-20">
            <div className="max-w-6xl mx-auto">
               {/* Technologies */}
               <div className="mb-16">
                  <h2 className="font-grotesk text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-8">
                     Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-3">
                     {project.technologies.map((tech, index) => (
                        <span
                           key={index}
                           className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                           {tech}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Project Gallery */}
               {project.images && project.images.length > 1 && (
                  <div className="mb-16">
                     <h2 className="font-grotesk text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-8">
                        Project Gallery
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.images.slice(1).map((image, index) => (
                           <div
                              key={index}
                              className="relative aspect-video overflow-hidden rounded-lg"
                              style={{
                                 clipPath:
                                    "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                              }}>
                              <img
                                 src={image}
                                 alt={`${project.title} screenshot ${
                                    index + 1
                                 }`}
                                 className="object-cover w-full h-full"
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Project Description */}
               <div>
                  <h2 className="font-grotesk text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-8">
                     About This Project
                  </h2>
                  <p className="text-lg text-[#A3A3A3] leading-relaxed max-w-4xl">
                     {project.longDescription}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProjectDetail;
