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
   category: string;
   year: string;
   images?: string[];
}

export const projects: Project[] = [
   {
      id: "project-1",
      imageSrc: "/project-1.png",
      title: "Admin Dashboard",
      alt: "Project 1 showcase",
      description: "A comprehensive admin dashboard for managing business operations",
      longDescription: "This admin dashboard provides a complete solution for managing business operations with real-time analytics, user management, and data visualization. Built with modern web technologies, it offers a responsive design that works seamlessly across all devices.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Node.js"],
      githubUrl: "https://github.com/username/admin-dashboard",
      liveUrl: "https://admin-dashboard-demo.com",
      featured: true,
      category: "Web Application",
      year: "2024",
      images: ["/project-1.png", "/project-1-detail-1.png", "/project-1-detail-2.png"]
   },
   {
      id: "project-2",
      imageSrc: "/project-2.png",
      title: "Linktree",
      alt: "Project 2 showcase",
      description: "A customizable link aggregation platform for social media",
      longDescription: "A modern take on link-in-bio solutions, allowing users to create beautiful, customizable landing pages that aggregate all their important links in one place. Features drag-and-drop customization and analytics tracking.",
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "Vercel"],
      githubUrl: "https://github.com/username/linktree-clone",
      liveUrl: "https://my-linktree-demo.com",
      featured: true,
      category: "Web Application",
      year: "2023",
      images: ["/project-2.png", "/project-2-detail-1.png"]
   },
   {
      id: "project-3",
      imageSrc: "/project-3.png",
      title: "Dashstack",
      alt: "Project 3 showcase",
      description: "A modular dashboard framework for rapid prototyping",
      longDescription: "Dashstack is a flexible dashboard framework that enables rapid prototyping and development of data visualization interfaces. It includes pre-built components, theming system, and extensive customization options.",
      technologies: ["Vue.js", "D3.js", "SCSS", "Webpack", "Express.js"],
      githubUrl: "https://github.com/username/dashstack",
      liveUrl: "https://dashstack-demo.com",
      featured: true,
      category: "Framework",
      year: "2023",
      images: ["/project-3.png", "/project-3-detail-1.png", "/project-3-detail-2.png"]
   },
   {
      id: "project-4",
      imageSrc: "/project-4.png",
      title: "TODO",
      alt: "Project 4 showcase",
      description: "A collaborative task management application",
      longDescription: "A modern task management application with real-time collaboration features, team workspaces, and advanced project tracking capabilities. Designed for remote teams to stay organized and productive.",
      technologies: ["React", "Socket.io", "MongoDB", "Express.js", "JWT"],
      githubUrl: "https://github.com/username/todo-app",
      liveUrl: "https://todo-app-demo.com",
      featured: true,
      category: "Web Application",
      year: "2024",
      images: ["/project-4.png", "/project-4-detail-1.png"]
   }
];
