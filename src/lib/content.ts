import type { Img } from "vite-imagetools";

// ============================================================================
// Types
// ============================================================================

interface SiteConfig {
	name: string;
	github: string;
	linkedin: string;
	email: string;
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
	ctaText?: string;
}

// ============================================================================
// Site
// ============================================================================

export const SITE: SiteConfig = {
	name: "Kasper Haugestøl",
	github: "https://github.com/shift-primal",
	linkedin: "https://linkedin.com/in/kasperhaugestol/",
	email: "kasper@haugestol.com",
};

// ============================================================================
// Hero
// ============================================================================

export const HERO: HeroContent = {
	tagline:
		"Fullstack-utvikler med fokus på solid struktur og gode brukeropplevelser.",
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
	bio: "Fullstack-utvikler under utdanning ved GET Academy. Arbeider med hele stacken — fra database og backend-logikk til grensesnitt og brukeropplevelser. Med vekt på ryddig, gjennomtenkt kode, beveger jeg meg raskt fra idé til produksjon, og drifter egne prosjekter helt ut i drift.",
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
		description:
			"Full Pokédex bygget på PokéAPI — virtualized search, evolution chains, per-form details og avansert filtrering.",
		images: screenshotsFor("pokemon"),
	},
	{
		title: "BFQ",
		liveHref: "https://quiz.haugestol.com",
		githubHref: "https://github.com/shift-primal/bfq",
		description:
			"Personlig trivia quiz — hvor godt kjenner du Kasper? Dynamisk score, store-based state, med live leaderboard.",
		images: screenshotsFor("quiz"),
	},
	{
		title: "Groovehaus",
		githubHref: "https://github.com/shift-primal/groovehaus",
		// liveHref: "https://example.com", - Not live
		description:
			"Et konsept for en nettbutikk for vinyl, musikkutstyr, og instrumenter — handlevogn, auth, og Stripe checkout.",
		images: screenshotsFor("groovehaus"),
		ctaText: "Kommer snart!",
	},
	{
		title: "txcategorizer",
		githubHref: "https://github.com/shift-primal/txcategorizer",
		liveHref: "https://www.npmjs.com/package/txcategorizer",
		description:
			"Parser og kategoriserer banktransaksjoner til strukturerte og fully typed data. CSV in, transaksjoner ut. Kommer snart: demo app",
		images: screenshotsFor("txcategorizer"),
		ctaText: "Se på npmjs.com!",
	},
];
