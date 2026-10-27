import type { Cv } from "#/content/cv/types";

export const cvEn: Cv = {
    name: {
        first: "Kasper",
        last: "Haugestøl",
    },
    role: "Full-stack developer",
    present: "present",

    sidebar: [
        {
            type: "contact",
            title: "Contact",
            items: [
                {
                    icon: "phone",
                    label: "+47 970 05 098",
                    href: "tel:+4797005098",
                },
                {
                    icon: "mail",
                    label: "kasper@haugestol.com",
                    href: "mailto:kasper@haugestol.com",
                },
                {
                    icon: "map-pin",
                    label: "Bøverbru, Innlandet, Norway",
                },
                {
                    icon: "globe",
                    label: "haugestol.com",
                    href: "https://haugestol.com",
                },
                {
                    icon: "github",
                    label: "github.com/shift-primal",
                    href: "https://github.com/shift-primal",
                },
            ],
        },
        {
            type: "education",
            title: "Education",
            items: [
                {
                    icon: "school",
                    title: "GET Academy",
                    description:
                        "Vocational college, frontend · coursework done, internship remaining",
                    period: {
                        start: 2025,
                    },
                },
            ],
        },
        {
            type: "skills",
            title: "Skills",
            groups: [
                {
                    icon: "monitor",
                    label: "Frontend",
                    items: [
                        "TypeScript",
                        "React",
                        "TanStack Start",
                        "Tailwind CSS",
                        "Accessibility (WCAG)",
                        "shadcn/ui",
                    ],
                },
                {
                    icon: "server",
                    label: "Backend",
                    items: [
                        "Node.js / Express",
                        "C# / ASP.NET Core",
                        "WebSockets",
                        "Zod",
                        "Medusa",
                    ],
                },
                {
                    icon: "database",
                    label: "Data",
                    items: [
                        "PostgreSQL",
                        "Drizzle ORM",
                    ],
                },
                {
                    icon: "cloud",
                    label: "Operations",
                    items: [
                        "Docker",
                        "GitHub Actions (CI/CD)",
                        "Background jobs (Graphile Worker)",
                        "Cloudflare",
                        "Hetzner / Coolify",
                        "Railway",
                    ],
                },
                {
                    icon: "plug",
                    label: "Integrations",
                    items: [
                        "Stripe",
                        "Better Auth",
                        "Resend",
                    ],
                },
                {
                    icon: "flask-conical",
                    label: "Testing",
                    items: [
                        "Vitest",
                        "Playwright",
                        "Axe",
                    ],
                },
                {
                    icon: "wrench",
                    label: "Tools",
                    items: [
                        "Git",
                        "Linux",
                        "Figma",
                    ],
                },
            ],
        },
    ],

    main: [
        {
            type: "text",
            title: "About me",
            body: "I like taking a product all the way, from the first sketch to running it in production. I've worked as a support worker and taught tech courses to colleagues, so I'm used to explaining things simply and working closely with people. GET Academy coursework is done, and I'm looking for an internship or junior role in software development.",
        },
        {
            type: "entries",
            id: "projects",
            title: "Projects",
            items: [
                {
                    id: "office-and-off",
                    title: "Office & Off",
                    status: "in development",
                    subtitle:
                        "Co-founder and developer · online clothing store",
                    description:
                        "An online store I'm building with two co-founders. I'm responsible for the technical side: the storefront, backend and payments, plus deploy and backup setup.",
                    tech: [
                        "TanStack Start",
                        "Medusa v2",
                        "Stripe",
                        "PostgreSQL",
                        "Railway",
                        "Resend",
                    ],
                },
                {
                    id: "gront-lys",
                    title: "Grønt Lys",
                    status: "in development (demo on request)",
                    subtitle:
                        "SaaS for heads of training at driving schools · solo developer",
                    description:
                        "Each school is isolated with row-level security in PostgreSQL. Four roles with their own permissions, two-factor auth, and an audit log whose rows are append-only. Background jobs send email and delete data on fixed rules (GDPR).",
                    tech: [
                        "TanStack Start",
                        "PostgreSQL",
                        "Drizzle",
                        "Graphile Worker",
                        "Better Auth",
                        "Playwright + axe",
                    ],
                },
                {
                    id: "spot",
                    title: "Spot",
                    links: [
                        {
                            href: "https://spot.haugestol.com",
                            label: "spot.haugestol.com",
                        },
                    ],
                    subtitle:
                        "Real-time shared drawing board, inspired by r/place",
                    description:
                        "Many people draw on one canvas at the same time and see each other's cursors live. Strokes are sent over WebSockets, validated and rate-limited on the server, and stored in tiles in SQLite. The client only fetches the tiles in view, and the server cleans up strokes that are completely hidden.",
                    tech: [
                        "React",
                        "Socket.IO",
                        "Express",
                        "SQLite",
                        "Canvas",
                        "Docker",
                    ],
                },
                {
                    id: "wastescope",
                    title: "Wastescope",
                    links: [
                        {
                            href: "https://ws.haugestol.com",
                            label: "ws.haugestol.com",
                        },
                        {
                            href: "https://www.npmjs.com/package/txcategorizer",
                            label: "npm: txcategorizer",
                        },
                    ],
                    subtitle: "Personal finance dashboard",
                    description:
                        "Upload an export from DNB or Valle, and the transactions are categorised so you can see where the money goes. The parsing lives in txcategorizer, my own TypeScript library published on npm.",
                    tech: [
                        "TanStack Start",
                        "PostgreSQL",
                        "Drizzle",
                        "Better Auth",
                        "Recharts",
                        "txcategorizer",
                    ],
                },
            ],
        },
        {
            type: "entries",
            id: "experience",
            title: "Work experience",
            items: [
                {
                    title: "Work placement, IT and media",
                    period: {
                        start: 2024,
                        end: 2025,
                    },
                    subtitle: "Bragd Utvikling",
                    description:
                        "Built web applications with Python/Django and React, mentored by a developer. Taught technology courses for colleagues and helped with media production and running Google Workspace.",
                },
                {
                    title: "Support worker",
                    period: {
                        start: 2022,
                        end: 2023,
                    },
                    subtitle: "Østre Toten kommune",
                    description:
                        "Supported users with special needs, working closely with staff and families.",
                },
                {
                    title: "Sales and service associate",
                    period: {
                        start: 2020,
                        end: 2022,
                    },
                    subtitle: "KIWI",
                    description:
                        "Customer service, checkout and stock handling in a busy grocery store.",
                },
            ],
        },
    ],
};
