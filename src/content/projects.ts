import type { Img } from "vite-imagetools";
import { type CvLink, getCvEntries } from "#/content/cv";
import { m } from "#/paraglide/messages";

export interface Project {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    status?: string;
    tech?: string[];
    links: CvLink[];
    githubHref?: string;
    // code and app aren't public; shown with a note instead of links
    isPrivate?: boolean;
    // offers a "Be om demo" button that prefills the contact form
    demoOnRequest?: boolean;
    // empty = placeholder until real screenshots exist
    images: Record<string, Img>;
}

const projectScreenshots = import.meta.glob<Img>(
    "/src/assets/screenshots/projects/*/*.png",
    {
        eager: true,
        import: "default",
        query: "?w=480;800;1600&format=webp&as=img",
    }
);

const screenshotsFor = (project: string): Record<string, Img> =>
    Object.fromEntries(
        Object.entries(projectScreenshots).filter(([path]) =>
            path.startsWith(`/src/assets/screenshots/projects/${project}/`)
        )
    );

// What the site adds on top of the CV entries (which own title, copy, tech
// and public links), keyed by CV entry id. To add screenshots to a project,
// drop PNGs in src/assets/screenshots/projects/<folder>/ (numbered for order)
// and set `images: screenshotsFor("<folder>")`; the placeholder goes away.
const SITE_EXTRAS: Record<
    string,
    Pick<Project, "githubHref" | "isPrivate" | "demoOnRequest" | "images">
> = {
    wastescope: {
        githubHref: "https://github.com/shift-primal/ws",
        images: {
            ...screenshotsFor("ws"),
            ...screenshotsFor("txcategorizer"),
        },
    },
    "office-and-off": {
        isPrivate: true,
        images: screenshotsFor("office-off"),
    },
    "gront-lys": {
        isPrivate: true,
        demoOnRequest: true,
        images: screenshotsFor("gront-lys"),
    },
    spot: {
        githubHref: "https://github.com/shift-primal/spot",
        images: screenshotsFor("spot"),
    },
};

export const FEATURED_PROJECT_ID = "wastescope";

// The CV's projects, featured one first, the rest in CV order. Functions
// rather than constants so copy follows the active locale.
export const getCvProjects = (): Project[] => {
    const projects = getCvEntries("projects").map(
        (entry): Project => ({
            id: entry.id ?? entry.title,
            title: entry.title,
            subtitle: entry.subtitle,
            description: entry.description,
            status: entry.status,
            tech: entry.tech,
            links: entry.links ?? [],
            ...(entry.id
                ? SITE_EXTRAS[entry.id]
                : {
                      images: {},
                  }),
        })
    );
    return [
        ...projects.filter((project) => project.id === FEATURED_PROJECT_ID),
        ...projects.filter((project) => project.id !== FEATURED_PROJECT_ID),
    ];
};

// earlier and smaller projects that aren't on the CV; only on /projects
const getOtherProjects = (): Project[] => [
    {
        id: "pokedex",
        title: "Pokédex",
        description: m.project_pokedex_description(),
        links: [
            {
                href: "https://pokemon.haugestol.com",
                label: "pokemon.haugestol.com",
            },
        ],
        githubHref: "https://github.com/shift-primal/pdex_26",
        images: screenshotsFor("pokemon"),
    },
    {
        id: "bfq",
        title: "BFQ",
        description: m.project_bfq_description(),
        links: [
            {
                href: "https://quiz.haugestol.com",
                label: "quiz.haugestol.com",
            },
        ],
        githubHref: "https://github.com/shift-primal/bfq",
        images: screenshotsFor("bfq"),
    },
];

export const getAllProjects = (): Project[] => [
    ...getCvProjects(),
    ...getOtherProjects(),
];
