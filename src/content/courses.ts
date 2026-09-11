import type { IconType } from "react-icons";
import { FaMicrosoft } from "react-icons/fa";
import { SiCodecademy, SiGoogle, SiScrimba } from "react-icons/si";

export type Course = {
    provider: string;
    title: string;
    icon: IconType;
    year: string;
};

export type Certificate = Course;

export const COURSES: Course[] = [
    {
        provider: "Codecademy",
        title: "Learn C#",
        icon: SiCodecademy,
        year: "2025",
    },
    {
        provider: "Microsoft",
        title: "Foundational C# Course",
        icon: FaMicrosoft,
        year: "2025",
    },
    {
        provider: "Scrimba",
        title: "Learn Next.js",
        icon: SiScrimba,
        year: "2025",
    },
    {
        provider: "Scrimba",
        title: "Advanced React",
        icon: SiScrimba,
        year: "2025",
    },
    {
        provider: "Scrimba",
        title: "Learn React",
        icon: SiScrimba,
        year: "2025",
    },
    {
        provider: "Codecademy",
        title: "Learn SQL",
        icon: SiCodecademy,
        year: "2025",
    },
    {
        provider: "Codecademy",
        title: "Front-End Engineer",
        icon: SiCodecademy,
        year: "2024",
    },
    {
        provider: "Codecademy",
        title: "Build Python Web Apps with Django",
        icon: SiCodecademy,
        year: "2024",
    },
    {
        provider: "Codecademy",
        title: "Learn Python 3",
        icon: SiCodecademy,
        year: "2024",
    },
];

export const CERTIFICATES: Certificate[] = [
    {
        provider: "Google",
        title: "Certified Educator Level 1",
        icon: SiGoogle,
        year: "2024",
    },
];
