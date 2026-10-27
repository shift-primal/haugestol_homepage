import type { Cv } from "#/content/cv/types";

export const cvNo: Cv = {
    name: {
        first: "Kasper",
        last: "Haugestøl",
    },
    role: "Fullstack-utvikler",
    present: "nå",

    sidebar: [
        {
            type: "contact",
            title: "Kontakt",
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
                    label: "Bøverbru, Innlandet",
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
            title: "Utdanning",
            items: [
                {
                    icon: "school",
                    title: "GET Academy",
                    description:
                        "Fagskole, frontend · undervisning fullført, gjenstår praksis",
                    period: {
                        start: 2025,
                    },
                },
            ],
        },
        {
            type: "skills",
            title: "Ferdigheter",
            groups: [
                {
                    icon: "monitor",
                    label: "Frontend",
                    items: [
                        "TypeScript",
                        "React",
                        "TanStack Start",
                        "Tailwind CSS",
                        "Universell utforming (WCAG)",
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
                    label: "Drift",
                    items: [
                        "Docker",
                        "GitHub Actions (CI/CD)",
                        "Bakgrunnsjobber (Graphile Worker)",
                        "Cloudflare",
                        "Hetzner / Coolify",
                        "Railway",
                    ],
                },
                {
                    icon: "plug",
                    label: "Integrasjoner",
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
                    label: "Verktøy",
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
            title: "Om meg",
            body: "Jeg liker å ta et produkt hele veien, fra første skisse til det kjører i drift. Jeg har jobbet som miljøarbeider og holdt teknologikurs for kollegaer, så jeg er vant til å forklare ting enkelt og jobbe tett med folk. Undervisningen ved GET Academy er ferdig, og jeg ser etter praksisplass eller juniorstilling innen systemutvikling.",
        },
        {
            type: "entries",
            id: "projects",
            title: "Prosjekter",
            items: [
                {
                    id: "office-and-off",
                    title: "Office & Off",
                    status: "i utvikling",
                    subtitle: "Medgründer og utvikler · nettbutikk for klær",
                    description:
                        "Nettbutikk jeg bygger sammen med to medgründere. Jeg har ansvaret for det tekniske: butikkfronten, backend og betaling, pluss oppsett for deploy og backup.",
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
                    status: "i utvikling (demo ved forespørsel)",
                    subtitle:
                        "SaaS for faglige ledere ved trafikkskoler · utvikler alene",
                    description:
                        "Hver skole er isolert med RLS i PostgreSQL. Fire roller med egne tilganger, tofaktor, og en revisjonslogg der rader er append-only. Bakgrunnsjobber sender e-post og sletter data etter faste regler (GDPR).",
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
                    subtitle: "Delt tegnebrett i sanntid, inspirert av r/place",
                    description:
                        "Mange tegner samtidig på ett lerret, og ser hverandres pekere i sanntid. Strøk sendes over WebSockets, valideres, blir rate-limited på serveren, og lagres i ruter i SQLite. Klienten henter bare rutene som vises, og serveren rydder bort strøk som er helt skjult.",
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
                    subtitle: "Dashboard for personlig økonomi",
                    description:
                        "Last opp en eksport fra DNB eller Valle, så blir transaksjonene kategorisert og du ser hvor pengene går. Parsingen ligger i txcategorizer, mitt eget TypeScript-bibliotek publisert på npm.",
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
            title: "Arbeidserfaring",
            items: [
                {
                    title: "Arbeidspraksis, IT og media",
                    period: {
                        start: 2024,
                        end: 2025,
                    },
                    subtitle: "Bragd Utvikling",
                    description:
                        "Utviklet nettapplikasjoner med Python/Django og React, med veiledning fra en utvikler. Holdt teknologikurs for kollegaer og bidro med medieproduksjon og drift av Google Workspace.",
                },
                {
                    title: "Miljøarbeider",
                    period: {
                        start: 2022,
                        end: 2023,
                    },
                    subtitle: "Østre Toten kommune",
                    description:
                        "Tilrettelegging og oppfølging av brukere med spesielle behov, i tett samarbeid med kollegaer og pårørende.",
                },
                {
                    title: "Salgs- og servicemedarbeider",
                    period: {
                        start: 2020,
                        end: 2022,
                    },
                    subtitle: "KIWI",
                    description:
                        "Kundeservice, kasse og varehåndtering i en travel butikk.",
                },
            ],
        },
    ],
};
