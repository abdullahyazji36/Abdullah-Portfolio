import { Project, Skill } from "./types";

// Projects
export const projects: Project[] = [];

// Skills
export const skills: Skill[] = [
    {
        id: "1",
        title: "frontend",
        skills: [
            { id: "2", title: "CSS" },
            { id: "3", title: "JavaScript" },
            { id: "4", title: "TypeScript" },
            { id: "5", title: "React" },
            { id: "6", title: "Next.js" },
            { id: "7", title: "Tailwind CSS" },
            { id: "8", title: "Material UI" },
        ]
    },
    {
        id: "2",
        title: "Backend",
        skills: [
            { id: '1', title: "Node.js" },
            { id: "2", title: "API Routes" },
            { id: "3", title: "Server Actions" },
            { id: "4", title: "Auth.js" },
        ]
    },
    {
        id: "3",
        title: "Database",
        skills: [
            { id: '1', title: "SQL" },
            { id: "2", title: "PostgreSQL" },
            { id: "3", title: "Prisma" },
        ]
    },
    {
        id: "4",
        title: "Tools",
        skills: [
            { id: '1', title: "Git" },
            { id: "2", title: "GitHub" },
            { id: "3", title: "VS Code" },
        ]
    },
    {
        id: "5",
        title: "Design",
        skills: [
            { id: "1", title: "Figma" }
        ]
    }

];