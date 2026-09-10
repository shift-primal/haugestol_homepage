import { m } from "#/paraglide/messages";

export interface HeroContent {
    tagline: string;
    technologies: string[];
}

// Wrapped in a function (rather than a module-level constant) so the
// paraglide message calls re-resolve the active locale on every call,
// instead of being frozen to whichever locale was active when this
// module first loaded.
export const getHero = (): HeroContent => ({
    tagline: m.hero_tagline(),
    technologies: [
        "Full-Stack",
        "TypeScript",
        "React",
        "TanStack",
        "Database",
        "DevOps",
    ],
});
