// Project data for the featured cases
export interface Project {
   id: string;
   imageSrc: string;
   alt?: string;
   title: string;
   description: string;
   longDescription: string;
   technologies: string[];
   githubUrl?: string;
   liveUrl?: string;
   featured: boolean;
   year: string;
   comingSoon?: boolean;
   videoSrc?: string;
   images?: string[];
}

export const projects: Project[] = [
   {
      id: "project-1",
      imageSrc: "/project-1.png",
      title: "Admin Dashboard",
      alt: "Project 1 showcase",
      description:
         "A comprehensive admin dashboard for managing business operations",
      longDescription:
         "This admin dashboard provides a complete solution for managing business operations with real-time analytics, user management, and data visualization. this was a project i built during my internship at Buguard LLC",
      technologies: ["React", "TypeScript", "Tailwind", "Ant Design"],
      githubUrl: "https://github.com/username/admin-dashboard",
      liveUrl: "celebrated-madeleine-a0f4ce.netlify.app",
      featured: true,
      year: "2025",
      comingSoon: true,
      images: ["/project-1.png"],
   },
   {
      id: "project-2",
      imageSrc: "/project-2.png",
      title: "Linktree",
      alt: "Project 2 showcase",
      description: "A clone of Linktree landing page",
      longDescription:
         "This was a collaboration with a friend, we tried to replicate the Linktree landing page from scratch, it was a fun project that didn't take much time but it was a good experience trying to make it look like the original, the hardest challenge of it was the 3D profile card, because i thought it was done using 3js and spent hours trying to do it, just to find out it can be done using css",
      technologies: ["Next.js", "Tailwind", "TypeScript"],
      featured: true,
      year: "2025",
      videoSrc: "/project-2/vid.mp4",
      images: ["/project-2/1.png", "/project-2/2.png", "/project-2/vid.mp4"],
   },
   {
      id: "project-3",
      imageSrc: "/project-3.png",
      title: "Dashstack",
      alt: "Project 3 showcase",
      description: "A dashboard for short linking and managing pdf files",
      longDescription:
         "This dashboard provides an uploader for pdf files and a short linker for them, we used supabase to handle auth and file uploading, we provided both arabic and english languages using nextintl",
      technologies: ["Next.js", "ReactPDF", "Tailwind", "NextIntl", "Supabase"],
      featured: true,
      year: "2025",
      videoSrc: "/project-3/vidsrc.mp4",
      images: [
         "/project-3.png",
         "/project-3/1.png",
         "/project-3/2.png",
         "/project-3/3.png",
         "/project-3/4.png",
         "/project-3/vid.mp4",
      ],
   },
   {
      id: "project-4",
      imageSrc: "/project-4.png",
      title: "Job Aggregator",
      alt: "Project 4 showcase",
      description: "A job aggregator for scraping and aggregating job offers from different job boards",
      longDescription:
         "I built this project for scraping and aggregating job offers from different job boards and presenting them in a unified interface, it was a fun project that helped me learn a lot about web scraping and data aggregation",
      technologies: [
         "React",
         "Next.js",
         "Tailwind",
         "TypeScript",
         "Express",
         "TypeORM",
         "PostgreSQL",
         "Redis",
         "Cheerio",
      ],
      githubUrl: "https://github.com/FreyGold/jobaggregater",
      liveUrl: "https://nimble-buttercream-897ec0.netlify.app/jobs",
      featured: true,
      year: "2026",
      videoSrc: "/project-4/vidSrc.mp4",
      images: [
         "/project-4/1.png",
         "/project-4/2.png",
         "/project-4/3.png",
         "/project-4/4.png",
         "/project-4/5.png",
         "/project-4/6.png",
         "/project-4/vid.mp4",
      ],
   },
];
