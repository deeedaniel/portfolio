import { Icons } from "@/components/icons";
import { FileTextIcon, HomeIcon } from "lucide-react";

export const DATA = {
  name: "Daniel Nguyen",
  initials: "DN",
  url: "https://deeedaniel.vercel.app",
  location: "San Jose, CA",
  locationLink: "https://www.google.com/maps/place/sanjose",
  description: "Full-Stack Engineer at TwinMind | CS @ SJSU",
  summary:
    "I'm a Vietnamese-American third year student at San Jose State University, currently working as a Full-Stack Engineer at TwinMind. I help build and scale their web app and backend that serve thousands of users. My experience spans full-stack development, from online e-commerce platforms to AI-powered web apps. I also like to dabble in filming and editing videos.",
  avatarUrl: "/me.jpeg",
  skills: [
    // Languages
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "HTML/CSS",
    // Frameworks & Libraries
    "React",
    "Next.js",
    "TailwindCSS",
    "FastAPI",
    "Express",
    "Prisma",
    // Databases & Platforms
    "PostgreSQL",
    "MongoDB",
    "Supabase",
    "Neon",
    "Firebase",
    "Vercel",
    "Auth0",
    // APIs & AI Tools
    "OpenAI API",
    "Gemini API",
    "Google API",
    "Portkey",
    "Twilio API",
    "Eleven Labs",
    // Developer Tools
    "Git",
    "VS Code",
    "Postman",
    "Docker",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/resume.pdf", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "nguyendaniel1312@gmail.com",
    tel: "+14089604093",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/deeedaniel",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/daniel-nguyenn/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "TwinMind",
      href: "https://twinmind.ai",
      badges: [],
      location: "Menlo Park, California",
      title: "Full-Stack Engineer Intern",
      logoUrl: "/twinmind.jpeg",
      start: "May 2025",
      end: "Present",
      description:
        "Developed TwinMind's AI-powered web app serving 5,000+ active users for real-time transcription and summarization of meetings, lectures, and privacy-focused syncing using Next.js, Neon Postgres, and Amplitude for analytics. Created an AI chat powered by Portkey, integrating multi-LLM fallbacks for reliability and enabled streaming responses. Migrated backend-rendered shared memory pages into frontend-first architecture with caching and revalidating. Published React component library (GitHub + npm) with 90+ downloads, with automated CI/CD pipelines. Improved privacy with 'Private Mode' (client-side storage), resolved key bugs (broken deletions, missing fallback logic), and created product videos with 30k+ views.",
    },
    {
      company: "Cooledtured",
      badges: [],
      href: "https://cooledtured.com",
      location: "Remote",
      title: "Web Developer Intern",
      logoUrl: "/cooledtured.jpeg",
      start: "Oct. 2024",
      end: "Apr. 2025",
      description:
        "Built responsive web-pages based off Figma designs while collaborating with 5 web developers and 2 UI/UX designers. Developed Firebase-powered quiz and poll pages, integrating live monthly and yearly user rankings for media content. Implemented a Firebase authentication system for user login, role-based authorization and quiz progress tracking. Led quality assurance meetings twice a week to identify road-blocks and review code to maximize user experience.",
    },
    {
      company: "Software & Computer Engineering Society at SJSU",
      href: "https://sjes.org/",
      badges: [],
      location: "San Jose, CA",
      title: "Software Developer Intern",
      logoUrl: "/sce.jpeg",
      start: "Jun. 2024",
      end: "Aug. 2024",
      description:
        "Optimized front-end performance by refactoring React components and removing redundant code. Set up Docker containers for a consistent development environment and easier deployment.",
    },
  ],
  education: [
    {
      school: "San Jose State University",
      href: "https://sjsu.edu",
      degree: "Bachelor of Science in Computer Science, 3.7 GPA Dean's Scholar",
      logoUrl: "/sjsu.png",
      start: "2023",
      end: "2027",
    },
    {
      school: "Andrew P. Hill High School",
      href: "https://andrewphill.esuhsd.org/",
      degree: "High School Diploma",
      logoUrl: "/ahill.jpeg",
      start: "2020",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "TwinMind Web-App",
      href: "https://twinmind.vercel.app",
      dates: "May 2025",
      active: true,
      description:
        "My interview assignment for TwinMind. I recreated their iOS app but in the web. Users can use the app to transcribe their microphone or call and get summaries of their calls.",
      technologies: [
        "Next.js",
        "Typescript",
        "Supabase Postgres",
        "NextAuth.js",
        "TailwindCSS",
        "OpenAI",
        "Gemini",
      ],
      links: [
        {
          type: "Website",
          href: "https://twinmind.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/twinmind-webapp.jpg",
    },
    {
      title: "VIVI",
      href: "https://devpost.com/software/vivi-qj6fug",
      dates: "Apr. 2025",
      active: true,
      description:
        "Built an AI-powered web app and Chrome extension that converts speech into images to support visual learning. Implemented real-time gaze tracking with Mediapipe and OpenCV to transcribe speech only when users are reading. Developed the front-end with React and TypeScript, ensuring a smooth and intuitive user experience. Designed a FastAPI backend to manage multiple AI APIs, manage user sessions, and log session analytics.",
      technologies: [
        "Python",
        "FastAPI",
        "DALL-E",
        "Whisper",
        "Mediapipe",
        "OpenCV",
        "React",
        "Typescript",
        "MongoDB",
        "TailwindCSS",
        "Auth0",
        "OpenAI",
        "DALL-E",
      ],
      links: [
        {
          type: "Devpost",
          href: "https://devpost.com/software/vivi-qj6fug",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/armanbance/VIVI",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/vivi.png",
    },
    {
      title: "👑 ChillGuy.ai (2nd Place)",
      href: "https://devpost.com/software/chillguy-ai",
      dates: "Feb. 2025",
      active: true,
      description:
        "Earned 2nd place out of 50+ teams at Santa Clara University's Hack for Humanity. Developed an AI-powered wellness bot that schedules and initiates stress-relief calls using Twilio and Eleven Labs AI. Designed and implemented scheduling functionality, allowing users to book automated check-in calls. Integrated Google OAuth and Google Calendar API to sync user schedules seamlessly. Leveraged Fastify and MongoDB to handle authentication, scheduling, and data persistence efficiently.",
      technologies: [
        "React",
        "Typescript",
        "MongoDB",
        "Twilio API",
        "Eleven Labs",
        "React",
        "TypeScript",
        "Google Calendar API",
        "Google OAuth",
      ],
      links: [
        {
          type: "Devpost",
          href: "https://devpost.com/software/chillguy-ai",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/ibix16/ChillGuy.ai",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/chillguy.png",
    },
    {
      title: "OfficeTracker",
      href: "https://github.com/NyiHtett/dev-08-0.2",
      dates: "Jan. 2025",
      active: true,
      description:
        "Led a 4-person team to develop a Java desktop application for university faculty to manage courses, office hours availability, and student appointments. Designed the full application using MVC architecture and UML diagrams; built GUI with JavaFX and SceneBuilder. Applied object-oriented principles including polymorphism via Comparable for dynamic sorting and data modeling. Achieved top scores on all version submissions, consistently earning 100%, 15% above the class average.",
      technologies: ["Java", "JavaFX", "SceneBuilder", "MVC", "CSV"],
      links: [
        {
          type: "Source",
          href: "https://github.com/NyiHtett/dev-08-0.2",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/officetracker.jpg",
    },
  ],
  hackathons: [
    {
      title: "HackDavis | UC Davis",
      dates: "April 2025",
      location: "Davis, CA",
      description:
        "Developed VIVI, an AI-powered web app that transforms speech into images to support visual learning. It uses real-time gaze tracking to only record user's voice when they are they actively reading.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "👑 Hack For Humanity | Santa Clara University (2nd Place)",
      dates: "February 2025",
      location: "Santa Clara, CA",
      description:
        "Developed ChillGuy.ai, a proactive AI-driven wellness bot that helps users manage stress by scheduling and initiating automated check-in calls. It integrates Twilio and Eleven Labs for natural conversations and syncs seamlessly with Google Calendar to fit into users’ daily routines.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
  ],
} as const;
