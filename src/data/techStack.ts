// Tech stack data organized by categories
export interface Technology {
   name: string;
   icon: string; // Icon name from react-icons
   category:
      | "frontend"
      | "backend"
      | "database"
      | "tools"
      | "languages"
      | "frameworks";
   proficiency: "expert" | "advanced" | "intermediate" | "beginner";
   color: string;
}

export interface TechCategory {
   id: string;
   name: string;
   description: string;
   technologies: Technology[];
}

export const techCategories: TechCategory[] = [
   {
      id: "frontend",
      name: "Frontend Development",
      description:
         "Technologies I use to create beautiful, responsive user interfaces",
      technologies: [
         {
            name: "React",
            icon: "SiReact",
            category: "frontend",
            proficiency: "expert",
            color: "#61DAFB",
         },
         {
            name: "Next.js",
            icon: "SiNextdotjs",
            category: "frontend",
            proficiency: "expert",
            color: "#000000",
         },
         {
            name: "TypeScript",
            icon: "SiTypescript",
            category: "frontend",
            proficiency: "expert",
            color: "#3178C6",
         },
         {
            name: "Tailwind CSS",
            icon: "SiTailwindcss",
            category: "frontend",
            proficiency: "expert",
            color: "#06B6D4",
         },
         {
            name: "JavaScript",
            icon: "SiJavascript",
            category: "frontend",
            proficiency: "expert",
            color: "#F7DF1E",
         },
         {
            name: "HTML5",
            icon: "SiHtml5",
            category: "frontend",
            proficiency: "expert",
            color: "#E34F26",
         },
         {
            name: "CSS3",
            icon: "SiCss3",
            category: "frontend",
            proficiency: "expert",
            color: "#1572B6",
         },
         {
            name: "Vite",
            icon: "SiVite",
            category: "frontend",
            proficiency: "advanced",
            color: "#646CFF",
         },
      ],
   },
   {
      id: "backend",
      name: "Backend Development",
      description:
         "Server-side technologies for building robust APIs and services",
      technologies: [
         {
            name: "Node.js",
            icon: "SiNodedotjs",
            category: "backend",
            proficiency: "advanced",
            color: "#339933",
         },
         {
            name: "Express.js",
            icon: "SiExpress",
            category: "backend",
            proficiency: "advanced",
            color: "#000000",
         },
         {
            name: "NestJS",
            icon: "SiNestjs",
            category: "backend",
            proficiency: "intermediate",
            color: "#E0234E",
         },
         {
            name: "REST APIs",
            icon: "SiSwagger",
            category: "backend",
            proficiency: "advanced",
            color: "#85EA2D",
         },
         {
            name: "GraphQL",
            icon: "SiGraphql",
            category: "backend",
            proficiency: "intermediate",
            color: "#E10098",
         },
      ],
   },
   {
      id: "database",
      name: "Database & Storage",
      description: "Data storage solutions and database management systems",
      technologies: [
         {
            name: "MongoDB",
            icon: "SiMongodb",
            category: "database",
            proficiency: "advanced",
            color: "#47A248",
         },
         {
            name: "PostgreSQL",
            icon: "SiPostgresql",
            category: "database",
            proficiency: "intermediate",
            color: "#336791",
         },
         {
            name: "Supabase",
            icon: "SiSupabase",
            category: "database",
            proficiency: "advanced",
            color: "#3ECF8E",
         },
         {
            name: "Redis",
            icon: "SiRedis",
            category: "database",
            proficiency: "intermediate",
            color: "#DC382D",
         },
      ],
   },
   {
      id: "tools",
      name: "Development Tools",
      description:
         "Essential tools and platforms for efficient development workflow",
      technologies: [
         {
            name: "Git",
            icon: "SiGit",
            category: "tools",
            proficiency: "expert",
            color: "#F05032",
         },
         {
            name: "GitHub",
            icon: "SiGithub",
            category: "tools",
            proficiency: "expert",
            color: "#181717",
         },
         {
            name: "VS Code",
            icon: "SiCode",
            category: "tools",
            proficiency: "expert",
            color: "#007ACC",
         },
         {
            name: "Postman",
            icon: "SiPostman",
            category: "tools",
            proficiency: "advanced",
            color: "#FF6C37",
         },
         {
            name: "Docker",
            icon: "SiDocker",
            category: "tools",
            proficiency: "intermediate",
            color: "#2496ED",
         },
      ],
   },
   {
      id: "frameworks",
      name: "Frameworks & Libraries",
      description:
         "Additional frameworks and libraries that enhance development",
      technologies: [
         {
            name: "Redux Toolkit",
            icon: "SiRedux",
            category: "frameworks",
            proficiency: "advanced",
            color: "#764ABC",
         },
         {
            name: "React Query",
            icon: "SiReactquery",
            category: "frameworks",
            proficiency: "advanced",
            color: "#FF4154",
         },
         {
            name: "Ant Design",
            icon: "SiAntdesign",
            category: "frameworks",
            proficiency: "advanced",
            color: "#0170FE",
         },
         {
            name: "React Context",
            icon: "SiReact",
            category: "frameworks",
            proficiency: "expert",
            color: "#61DAFB",
         },
         {
            name: "GSAP",
            icon: "SiGreensock",
            category: "frameworks",
            proficiency: "intermediate",
            color: "#88CE02",
         },
      ],
   },
];

export const getAllTechnologies = (): Technology[] => {
   return techCategories.flatMap((category) => category.technologies);
};

export const getTechnologiesByCategory = (categoryId: string): Technology[] => {
   const category = techCategories.find((cat) => cat.id === categoryId);
   return category ? category.technologies : [];
};

export const getTechnologiesByProficiency = (
   proficiency: Technology["proficiency"]
): Technology[] => {
   return getAllTechnologies().filter(
      (tech) => tech.proficiency === proficiency
   );
};
