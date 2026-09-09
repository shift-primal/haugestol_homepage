import type { Img } from "vite-imagetools";
import { m } from "#/paraglide/messages";

// ============================================================================
// Types
// ============================================================================

interface SiteConfig {
	name: string;
	github: string;
	linkedin: string;
	email: string;
	discord: string;
}

interface HeroContent {
	tagline: string;
	technologies: string[];
}

interface AboutContent {
	bio: string;
}

export interface Project {
	title: string;
	badge?: string;
	liveHref?: string;
	githubHref?: string;
	description: string;
	images: Record<string, Img>;
	ctaText: string;
}

// ============================================================================
// Site
// ============================================================================

export const SITE: SiteConfig = {
	name: "Kasper Haugestøl",
	github: "https://github.com/shift-primal",
	linkedin: "https://linkedin.com/in/kasperhaugestol/",
	discord: "https://discord.com/users/223913551767535627",
	email: "kasper@haugestol.com",
};

// ============================================================================
// Hero
// ============================================================================

export const HERO: HeroContent = {
	tagline: m.hero_tagline(),
	technologies: [
		"Full-Stack",
		"TypeScript",
		"React",
		"TanStack",
		"Database",
		"DevOps",
	],
};

// ============================================================================
// About
// ============================================================================

export const ABOUT: AboutContent = {
	bio: m.about_bio(),
};

// ============================================================================
// Projects
// ============================================================================

const projectScreenshots = import.meta.glob<Img>(
	"/src/assets/screenshots/projects/*/*.png",
	{
		eager: true,
		import: "default",
		query: "?w=480;800;1600&format=webp&as=img",
	},
);

const screenshotsFor = (project: string): Record<string, Img> =>
	Object.fromEntries(
		Object.entries(projectScreenshots).filter(([path]) =>
			path.startsWith(`/src/assets/screenshots/projects/${project}/`),
		),
	);

export const PROJECTS: Project[] = [
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
		images: screenshotsFor("quiz"),
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
	},
];
