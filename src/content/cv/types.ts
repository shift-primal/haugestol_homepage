// Shape of the CV. Ported from the Astro resume (~/jobbsok/resume), which
// validated the same structure with zod; here the compiler does that job.

export type CvIcon =
    | "phone"
    | "mail"
    | "map-pin"
    | "globe"
    | "github"
    | "school"
    | "monitor"
    | "server"
    | "database"
    | "cloud"
    | "plug"
    | "flask-conical"
    | "wrench";

export interface CvPeriod {
    start: number;
    // omitted = ongoing
    end?: number;
}

export interface CvLink {
    href: string;
    label: string;
}

export interface CvEntry {
    // stable key, shared with the homepage's project data
    id?: string;
    title: string;
    subtitle: string;
    description: string;
    period?: CvPeriod;
    status?: string;
    links?: CvLink[];
    tech?: string[];
}

export interface CvContactSection {
    type: "contact";
    title: string;
    items: {
        icon: CvIcon;
        label: string;
        href?: string;
    }[];
}

export interface CvEducationSection {
    type: "education";
    title: string;
    items: {
        icon: CvIcon;
        title: string;
        description: string;
        period?: CvPeriod;
    }[];
}

export interface CvSkillsSection {
    type: "skills";
    title: string;
    groups: {
        icon: CvIcon;
        label: string;
        items: [
            string,
            ...string[],
        ];
    }[];
}

export interface CvTextSection {
    type: "text";
    title: string;
    body: string;
}

export interface CvEntriesSection {
    type: "entries";
    // lets the homepage find a section without matching on translated titles
    id: "projects" | "experience";
    title: string;
    items: CvEntry[];
}

export type CvSidebarSection =
    | CvContactSection
    | CvEducationSection
    | CvSkillsSection;

export type CvMainSection = CvTextSection | CvEntriesSection;

export interface Cv {
    name: {
        first: string;
        last: string;
    };
    role: string;
    // word for the open end of a period, e.g. "2025 – nå"
    present: string;
    sidebar: CvSidebarSection[];
    main: CvMainSection[];
}
