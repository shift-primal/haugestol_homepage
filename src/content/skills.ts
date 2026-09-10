import {
    DatabaseIcon,
    GearIcon,
    type Icon,
    LaptopIcon,
    ToolboxIcon,
} from "@phosphor-icons/react";
import type { IconType } from "react-icons";
import { PiAtom } from "react-icons/pi";
import {
    SiClaude,
    SiCoolify,
    SiCss,
    SiDiagramsdotnet,
    SiDocker,
    SiDotnet,
    SiDrizzle,
    SiExpress,
    SiFigma,
    SiGit,
    SiGithub,
    SiGnubash,
    SiHtml5,
    SiJavascript,
    SiLinux,
    SiNeon,
    SiNeovim,
    SiNextdotjs,
    SiNodedotjs,
    SiNpm,
    SiPnpm,
    SiPostgresql,
    SiPython,
    SiReact,
    SiSharp,
    SiSqlite,
    SiSupabase,
    SiTailwindcss,
    SiTanstack,
    SiTypescript,
    SiZod,
} from "react-icons/si";

type SkillCategory = "frontend" | "backend" | "database" | "development";

export interface Skill {
    title: string;
    icon: IconType;
    /** Omit for marks that flip black/white by background; falls back to theme text color. */
    color?: string;
}

export interface SkillGroup {
    category: SkillCategory;
    icon: Icon;
    skills: Skill[];
}

export interface SkillsContent {
    skills: SkillGroup[];
}

export const SKILLS: SkillsContent = {
    skills: [
        {
            category: "frontend",
            icon: LaptopIcon,
            skills: [
                {
                    title: "React",
                    icon: SiReact,
                    color: "#61DAFB",
                },
                {
                    title: "TanStack",
                    icon: SiTanstack,
                },
                {
                    title: "TypeScript",
                    icon: SiTypescript,
                    color: "#3178C6",
                },
                {
                    title: "JavaScript",
                    icon: SiJavascript,
                    color: "#F7DF1E",
                },
                {
                    title: "HTML5",
                    icon: SiHtml5,
                    color: "#E34F26",
                },
                {
                    title: "CSS",
                    icon: SiCss,
                    color: "#663399",
                },
                {
                    title: "Tailwind",
                    icon: SiTailwindcss,
                    color: "#06B6D4",
                },
                {
                    title: "Zustand",
                    icon: PiAtom,
                },
                {
                    title: "Next.js",
                    icon: SiNextdotjs,
                },
                {
                    title: "Zod",
                    icon: SiZod,
                    color: "#408AFF",
                },
            ],
        },
        {
            category: "backend",
            icon: GearIcon,
            skills: [
                {
                    title: "TanStack Start",
                    icon: SiTanstack,
                },
                {
                    title: "Node.js",
                    icon: SiNodedotjs,
                    color: "#5FA04E",
                },
                {
                    title: "C#",
                    icon: SiSharp,
                    color: "#99CC00",
                },
                {
                    title: "ASP.NET",
                    icon: SiDotnet,
                    color: "#512BD4",
                },
                {
                    title: "Drizzle ORM",
                    icon: SiDrizzle,
                    color: "#C5F74F",
                },
                {
                    title: "Express",
                    icon: SiExpress,
                },
            ],
        },
        {
            category: "database",
            icon: DatabaseIcon,
            skills: [
                {
                    title: "PostgreSQL",
                    icon: SiPostgresql,
                    color: "#4169E1",
                },
                {
                    title: "Neon",
                    icon: SiNeon,
                    color: "#34D59A",
                },
                {
                    title: "SQLite",
                    icon: SiSqlite,
                    color: "#003B57",
                },
                {
                    title: "Supabase",
                    icon: SiSupabase,
                    color: "#3FCF8E",
                },
            ],
        },
        {
            category: "development",
            icon: ToolboxIcon,
            skills: [
                {
                    title: "Git",
                    icon: SiGit,
                    color: "#F03C2E",
                },
                {
                    title: "GitHub",
                    icon: SiGithub,
                },
                {
                    title: "Neovim",
                    icon: SiNeovim,
                    color: "#57A143",
                },
                {
                    title: "Claude",
                    icon: SiClaude,
                    color: "#D97757",
                },
                {
                    title: "Linux",
                    icon: SiLinux,
                    color: "#FCC624",
                },
                {
                    title: "Figma",
                    icon: SiFigma,
                    color: "#F24E1E",
                },
                {
                    title: "Docker",
                    icon: SiDocker,
                    color: "#2496ED",
                },
                {
                    title: "Bash",
                    icon: SiGnubash,
                    color: "#4EAA25",
                },
                {
                    title: "Python",
                    icon: SiPython,
                    color: "#3776AB",
                },
                {
                    title: "draw.io",
                    icon: SiDiagramsdotnet,
                    color: "#F08705",
                },
                {
                    title: "npm",
                    icon: SiNpm,
                    color: "#CB3837",
                },
                {
                    title: "pnpm",
                    icon: SiPnpm,
                    color: "#F69220",
                },
                {
                    title: "Coolify",
                    icon: SiCoolify,
                    color: "#6B16ED",
                },
            ],
        },
    ],
};
