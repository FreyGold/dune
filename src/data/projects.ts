export interface Project {
   id: string;
   imageSrc?: string;
   imageFit?: "contain" | "cover";
   alt?: string;
   title: string;
   description: string;
   longDescription: string;
   technologies: string[];
   githubUrl?: string;
   downloadUrl?: string;
   liveUrl?: string;
   liveLabel?: string;
   liveNote?: string;
   featured: boolean;
   year?: string;
   comingSoon?: boolean;
   videoSrc?: string;
   images?: string[];
   mediaNote?: string;
   highlights?: string[];
}

export const projects: Project[] = [
   {
      id: "amer",
      imageSrc: "/projects/amer/dashboard-live.png",
      alt: "Amer dashboard with sample data",
      title: "Amer",
      description: "A workspace for employee management and business operations.",
      longDescription: "Amer brings employee records, attendance, requests, payroll, and internal communication into one workspace. I built the entire frontend, connecting these workflows to an API with role-based permissions and real-time messaging.",
      technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Socket.IO"],
      highlights: ["Built the complete frontend for the management workspace.", "Brought employee records, contracts, attendance, requests, and payroll into one interface.", "Connected role-based access and real-time messaging to the backend."],
      liveUrl: "https://amer-showcase.vercel.app/",
      liveLabel: "Open application",
      liveNote: "Use the demo sign-in details on the login page.",
      featured: true,
      mediaNote: "The images and recording show the hosted app with sample data.",
      images: ["/projects/amer/dashboard-live.png", "/projects/amer/members-live.png", "/projects/amer/full-app-tour.mp4"],
   },
   {
      id: "cortex",
      imageSrc: "/projects/cortex/home.png",
      alt: "Cortex homepage",
      title: "Cortex",
      description: "A bilingual workspace for collaborative study.",
      longDescription: "I built Cortex with AI assistance as a graduation project. It brings collaborative notes, academic resources, AI study assistance, habits, and focus tools together. The project also includes browser and GNOME extensions.",
      technologies: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Supabase", "Yjs"],
      highlights: ["Write and collaborate on notes in Arabic and English.", "Browse academic resources by university, major, and course.", "Use study assistance, focus tools, and companion extensions."],
      githubUrl: "https://github.com/FreyGold/Cortex",
      liveUrl: "https://cortex-eta-black.vercel.app/",
      featured: true,
      images: ["/projects/cortex/home.png", "/projects/cortex/home-tour.mp4"],
      mediaNote: "The image and recording show the public homepage. Signed-in features have not been checked.",
   },
   {
      id: "tamatem",
      imageSrc: "/projects/tamatem/sign-in.png",
      alt: "Tamatem sign-in screen",
      title: "Tamatem",
      description: "A student planner for work, habits, and focus sessions.",
      longDescription: "Tamatem helps students plan work, track habits, and record focus sessions. The project includes a web app, an API, a browser extension, and a mobile prototype.",
      technologies: ["Next.js", "TypeScript", "Express", "Supabase", "Expo"],
      highlights: ["Plan work and track habits.", "Record focus sessions across the web app and browser extension.", "Explore a mobile prototype built with Expo."],
      liveUrl: "https://www.tamatem.me/",
      liveLabel: "Open website",
      featured: true,
      images: ["/projects/tamatem/sign-in.png"],
      mediaNote: "The image shows the hosted sign-in page. Signed-in features have not been checked.",
   },
   {
      id: "autonatic",
      imageSrc: "/projects/autonatic/create-current.png",
      alt: "Autonatic note creation workspace in Obsidian",
      title: "Autonatic",
      description: "An Obsidian plugin for turning source material into structured notes.",
      longDescription: "Autonatic turns text, shared AI conversations, and images into Markdown notes. It supports multiple AI providers and includes tools to search source passages and organize a vault.",
      technologies: ["TypeScript", "Obsidian", "AI APIs", "Markdown"],
      highlights: ["Create notes from text, images, and shared conversations.", "Search original passages in a local vault index.", "Review note organization plans before applying them."],
      liveUrl: "https://community.obsidian.md/plugins/autonatic",
      liveLabel: "Obsidian plugin page",
      githubUrl: "https://github.com/FreyGold/autonatic",
      downloadUrl: "https://github.com/FreyGold/autonatic/releases/latest",
      featured: true,
      mediaNote: "The screenshots and screen recording show the local version in a sample Obsidian vault. No AI provider was connected during capture.",
      images: ["/projects/autonatic/tour.mp4", "/projects/autonatic/create-current.png", "/projects/autonatic/search.png", "/projects/autonatic/organize.png"],
   },
   {
      id: "project-4",
      imageSrc: "/project-4/1.png",
      alt: "Job Aggregator search and filter interface",
      title: "Job Aggregator",
      description: "Job listings from multiple sources in one interface.",
      longDescription: "Job Aggregator collects listings from different job boards and presents them in one searchable interface. The project includes web, mobile, and API components.",
      technologies: ["React", "Next.js", "TypeScript", "Express", "PostgreSQL", "Redis"],
      highlights: ["Collect job listings from different sources.", "Search and filter listings in a single interface.", "Support web, mobile, and API clients in one workspace."],
      githubUrl: "https://github.com/FreyGold/jobaggregater",
      liveUrl: "https://nimble-buttercream-897ec0.netlify.app/jobs",
      liveLabel: "Open website",
      featured: false,
      videoSrc: "/project-4/vidSrc.mp4",
      mediaNote: "The screenshots and video show an earlier version of the app. The hosted page opens, but job listings were not verified.",
      images: ["/project-4/1.png", "/project-4/2.png", "/project-4/3.png", "/project-4/vid.mp4"],
   },
   {
      id: "go-boilerplate",
      imageSrc: "/projects/go-boilerplate/architecture.svg",
      alt: "Diagram of the Go Boilerplate components",
      title: "Go Boilerplate",
      description: "A starter for full-stack projects with a Go backend.",
      longDescription: "This starter combines a Go backend and a frontend workspace with project creation scripts, Docker Compose, PostgreSQL, Redis, and database migrations.",
      technologies: ["Go", "React", "TypeScript", "PostgreSQL", "Redis", "Docker"],
      highlights: ["Create a named project from the template.", "Start the backend, PostgreSQL, and Redis with Docker Compose.", "Run database migrations during startup."],
      githubUrl: "https://github.com/FreyGold/go-boilerplate",
      featured: false,
      images: ["/projects/go-boilerplate/architecture.svg"],
      mediaNote: "This diagram summarizes the project's components.",
   },
   {
      id: "inventory",
      imageSrc: "/projects/inventory/dashboard.png",
      alt: "Inventory dashboard with sample sales and stock data",
      title: "Inventory",
      description: "A desktop workspace for stock, invoices, and reports.",
      longDescription: "Inventory brings product management, stock tracking, invoices, and reports into a desktop app. Its dashboard shows sales and low-stock information.",
      technologies: ["Electron", "React", "TypeScript", "SQLite"],
      highlights: ["Manage products and stock quantities.", "Create invoices and review sales information.", "Review low-stock and stock movement reports."],
      liveUrl: "/demos/inventory/index.html",
      liveLabel: "Open sample demo",
      featured: false,
      images: ["/projects/inventory/dashboard.png", "/projects/inventory/products.png", "/projects/inventory/demo.mp4"],
      mediaNote: "The images and recording use sample data in an isolated browser preview of the desktop app.",
   },
   {
      id: "voice-typer",
      imageSrc: "/projects/voice-typer/demo-screen.png",
      imageFit: "contain",
      alt: "Voice Typer interface preview",
      title: "Voice Typer",
      description: "Speech-to-text input for applications across the desktop.",
      longDescription: "Voice Typer records speech and types the transcription into the active application. It supports local and cloud transcription, with settings for Egyptian Arabic.",
      technologies: ["Python", "faster-whisper", "Groq"],
      highlights: ["Transcribe speech locally or with a cloud provider.", "Type the result into the active application.", "Use vocabulary settings for Egyptian Arabic."],
      githubUrl: "https://github.com/FreyGold/voice_typer",
      featured: false,
      images: ["/projects/voice-typer/demo.mp4", "/projects/voice-typer/demo-screen.png"],
      mediaNote: "This recording shows Voice Typer transcribing speech into another desktop application.",
   },
   {
      id: "sbc-solver",
      imageSrc: "/projects/sbc-solver/architecture.svg",
      alt: "Diagram of the SBC Solver request flow",
      title: "SBC Solver",
      description: "A local solver and browser extension for squad challenges.",
      longDescription: "SBC Solver combines a browser extension with a local Python solver. It selects squads for EA FC 26 challenges using the challenge requirements and card preferences.",
      technologies: ["JavaScript", "Python", "Flask", "OR-Tools"],
      highlights: ["Read a challenge from the browser extension.", "Solve constraints with a local CP-SAT model.", "Choose a squad while protecting selected card types."],
      githubUrl: "https://github.com/FreyGold/solva-sbc-solver",
      featured: false,
      images: ["/projects/sbc-solver/architecture.svg"],
      mediaNote: "This diagram summarizes the solver flow.",
   },
   {
      id: "offline-music",
      imageSrc: "/projects/offline-music/screen.png",
      imageFit: "contain",
      alt: "Earlier browser version of the music library on an iPhone",
      title: "Offline Music Library",
      description: "An iPhone music app for downloading and listening offline.",
      longDescription: "Offline Music Library is designed for iPhone. It connects to a local or remote server that uses yt-dlp to download music. The app saves tracks on the iPhone, so they can be played later without a server connection.",
      technologies: ["iOS", "React Native", "Expo", "SQLite", "FastAPI", "yt-dlp", "ffmpeg"],
      highlights: ["Connect to a local or remote server to find and download music.", "Use yt-dlp on the server to prepare audio for the iPhone.", "Save tracks on the iPhone and play them offline."],
      featured: false,
      images: ["/projects/offline-music/demo.mp4", "/projects/offline-music/screen.png"],
      mediaNote: "This recording shows an earlier browser version on an iPhone. The current app is a native iPhone app.",
   },
];
