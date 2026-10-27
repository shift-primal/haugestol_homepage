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
    isPrivate?: boolean;
    demoOnRequest?: boolean;
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

export const FEATURED_PROJECT_ID = "gront-lys";

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
        id: "klyndre",
        title: "Klyndre",
        description: m.project_klyndre_description(),
        links: [],
        githubHref: "https://github.com/shift-primal/klyndre",
        images: screenshotsFor("klyndre"),
    },
];

export const getAllProjects = (): Project[] => [
    ...getCvProjects(),
    ...getOtherProjects(),
];
