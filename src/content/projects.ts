import type { Img } from "vite-imagetools";
import { m } from "#/paraglide/messages";

export interface Project {
    title: string;
    badge?: string;
    liveHref?: string;
    githubHref?: string;
    description: string;
    images: Record<string, Img>;
    ctaText: string;
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

export const getProjects = (): Project[] => [
    {
        title: "Pokédex",
        liveHref: "https://pokemon.haugestol.com",
        githubHref: "https://github.com/shift-primal/pdex_26",
        description: m.project_pokedex_description(),
        images: screenshotsFor("pokemon"),
        ctaText: m.project_pokedex_cta(),
    },
    {
        title: "BFQ",
        liveHref: "https://quiz.haugestol.com",
        githubHref: "https://github.com/shift-primal/bfq",
        description: m.project_bfq_description(),
        images: screenshotsFor("bfq"),
        ctaText: m.project_bfq_cta(),
    },
    {
        title: "Groovehaus",
        githubHref: "https://github.com/shift-primal/groovehaus",
        // liveHref: "https://example.com", - Not live
        description: m.project_groovehaus_description(),
        images: screenshotsFor("groovehaus"),
        ctaText: m.project_groovehaus_cta(),
    },
    {
        title: "txcategorizer",
        githubHref: "https://github.com/shift-primal/txcategorizer",
        liveHref: "https://www.npmjs.com/package/txcategorizer",
        description: m.project_txcategorizer_description(),
        images: screenshotsFor("txcategorizer"),
        ctaText: m.project_txcategorizer_cta(),
        badge: m.project_txcategorizer_badge(),
    },
];
