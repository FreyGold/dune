import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { projects } from "../../data/projects";
import { BiArrowBack, BiDownload, BiLinkExternal, BiLogoGithub } from "react-icons/bi";

function ProjectDetail() {
   const { projectId } = useParams<{ projectId: string }>();
   const project = projects.find((p) => p.id === projectId);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
   }, []);

   // Scroll to top when component mounts
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   if (!project) {
      return (
         <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20 sm:pt-32 md:pt-40 animate-fade-in">
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
      <div className="min-h-screen bg-black text-white pt-20 sm:pt-32 md:pt-40 animate-fade-in">
         {/* Hero Section */}
         <div className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen lg:min-h-screen flex items-center justify-center">
            {project.videoSrc ? (
               <video
                  src={project.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                     objectFit: "cover",
                  }}
                  onLoadedData={(e) => {
                     e.currentTarget.playbackRate = 1;
                  }}
               />
            ) : project.imageSrc ? (
               <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                     backgroundImage: `url(${project.imageSrc})`,
                     backgroundAttachment: isMobile ? "scroll" : "fixed",
                     backgroundSize: project.imageFit === "contain" ? "contain" : "cover",
                     backgroundColor: "#171717",
                  }}
               />
            ) : (
               <div className="absolute inset-0 bg-neutral-900" />
            )}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-4xl mx-auto">
               {project.year && <div className="mb-3 sm:mb-4">
                  <span className="inline-block text-xs sm:text-sm text-[#A3A3A3] uppercase tracking-wider mb-2">
                     {project.year}
                  </span>
               </div>}
               <h1 className="font-grotesk text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold uppercase [word-spacing:-0.1rem] tracking-tight mb-3 sm:mb-4 md:mb-6 leading-tight">
                  {project.title}
               </h1>
               <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#A3A3A3] leading-relaxed max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2">
                  {project.longDescription}
               </p>

               {/* Action Buttons */}
               <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
                  {project.liveUrl && (
                     <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base">
                        <BiLinkExternal />
                        {project.liveLabel ?? "Live Demo"}
                     </a>
                  )}
                  {project.downloadUrl && (
                     <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base">
                        <BiDownload />
                        Download
                     </a>
                  )}
                  {project.githubUrl && (
                     <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-white text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors text-sm sm:text-base">
                        <BiLogoGithub />
                        View Code
                     </a>
                  )}
               </div>
               {project.liveNote && (
                  <p className="mt-3 text-sm text-neutral-300">{project.liveNote}</p>
               )}
            </div>
         </div>

         {/* Project Details */}
         <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
               {/* Technologies */}
               <div className="mb-8 sm:mb-12 md:mb-16">
                  <h2 className="font-grotesk text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-4 sm:mb-6 md:mb-8">
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

               {project.highlights && (
                  <div className="mb-8 sm:mb-12 md:mb-16">
                     <h2 className="font-grotesk text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-4 sm:mb-6">
                        What it does
                     </h2>
                     <ul className="flex flex-col gap-3 text-lg text-neutral-400 max-w-4xl list-disc pl-5">
                        {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                     </ul>
                  </div>
               )}

               {/* Project Gallery */}
               {project.images && project.images.length > 0 && (
                  <div className="mb-8 sm:mb-12 md:mb-16">
                     <h2 className="font-grotesk text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-4 sm:mb-6 md:mb-8">
                        Project Gallery
                     </h2>
                     {project.mediaNote && (
                        <p className="mb-4 text-sm text-neutral-400">{project.mediaNote}</p>
                     )}
                     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {project.images.map((media, index) => {
                           const isVideo = media.endsWith(".mp4");
                           return (
                              <div
                                 key={index}
                                 className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-video overflow-hidden rounded-lg"
                                 style={{
                                    clipPath:
                                       "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                                 }}>
                                 {isVideo ? (
                                    <video
                                       src={media}
                                       controls
                                       className="object-contain bg-neutral-900 w-full h-full">
                                       Your browser does not support the video
                                       tag.
                                    </video>
                                 ) : (
                                    <img
                                       src={media}
                                       alt={`${project.title} screenshot ${
                                          index + 1
                                       }`}
                                       className={`${project.imageFit === "contain" ? "object-contain bg-neutral-900" : "object-cover"} w-full h-full transition-transform duration-300 hover:scale-105`}
                                       loading="lazy"
                                    />
                                 )}
                              </div>
                           );
                        })}
                     </div>
                  </div>
               )}

               {/* Project Description */}
               <div>
                  <h2 className="font-grotesk text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-4 sm:mb-6 md:mb-8">
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
