export type Course = {
    provider: string;
    title: string;
    year: string;
};

export type Certificate = Course;

export const COURSES: Course[] = [
    {
        provider: "Codecademy",
        title: "Learn C#",
        year: "2025",
    },
    {
        provider: "Microsoft",
        title: "Foundational C# Course",
        year: "2025",
    },
    {
        provider: "Scrimba",
        title: "Learn Next.js",
        year: "2025",
    },
    {
        provider: "Scrimba",
        title: "Advanced React",
        year: "2025",
    },
    {
        provider: "Scrimba",
        title: "Learn React",
        year: "2025",
    },
    {
        provider: "Codecademy",
        title: "Learn SQL",
        year: "2025",
    },
    {
        provider: "Codecademy",
        title: "Front-End Engineer",
        year: "2024",
    },
    {
        provider: "Codecademy",
        title: "Build Python Web Apps with Django",
        year: "2024",
    },
    {
        provider: "Codecademy",
        title: "Learn Python 3",
        year: "2024",
    },
];

export const CERTIFICATES: Certificate[] = [
    {
        provider: "Google",
        title: "Certified Educator Level 1",
        year: "2024",
    },
];
