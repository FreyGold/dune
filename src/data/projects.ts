// Project data for the featured cases
export interface Project {
   id: string;
   imageSrc: string;
   alt?: string;
   title: string;
}

export const projects: Project[] = [
   {
      id: "project-1",
      imageSrc: "/project-1.png",
      title: "Admin Dashboard",
      alt: "Project 1 showcase",
   },
   {
      id: "project-2",
      imageSrc: "/project-2.png",
      title: "Linktree",
      alt: "Project 2 showcase",
   },
   {
      id: "project-3",
      imageSrc: "/project-3.png",
      title: "Dashstack",
      alt: "Project 3 showcase",
   },
   {
      id: "project-4",
      imageSrc: "/project-4.png",
      title: "TODO",
      alt: "Project 4 showcase",
   },
];
