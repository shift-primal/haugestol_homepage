import type { Img } from "vite-imagetools";

// Hero

export const NAME = "Kasper Haugestøl";

export const GITHUB_LINK = "https://github.com/shift-primal";

export const EMAIL = "kasper@haugestol.com";

export const TAGLINE =
	"Building reliable, cloud-native systems — from CI/CD pipelines to full-stack apps.";

export const TECHNOLOGIES_SHOWCASE = [
	"Full-Stack",
	"TypeScript",
	"React",
	"Database",
	"DevOps",
];

// About

export const BIO =
	"Fullstack-utvikler med frontend-fokus, under utdanning ved GET Academy. Brenner for moderne webutvikling med sterk interesse for grensesnitt, brukeropplevelse og robust kodearkitektur. Selvstendig og lærevillig — går raskt fra konsept til implementasjon, noe som gjenspeiles i at jeg har publisert egne verktøy som open source og selv drifter flere prosjekter helt frem til produksjon.";

// Projects

export interface Project {
	title: string;
	liveHref?: string;
	githubHref?: string;
	description: string;
	images: Record<string, Img>;
}

const pokemonScreenshots = import.meta.glob<Img>(
	"/src/assets/screenshots/projects/pokemon/*.png",
	{
		eager: true,
		import: "default",
		query: "?w=480;800;1600&format=webp&as=img",
	},
);

const quizScreenshots = import.meta.glob<Img>(
	"/src/assets/screenshots/projects/quiz/*.png",
	{
		eager: true,
		import: "default",
		query: "?w=480;800;1600&format=webp&as=img",
	},
);

const groovehausScreenshots = import.meta.glob<Img>(
	"/src/assets/screenshots/projects/groovehaus/*.png",
	{
		eager: true,
		import: "default",
		query: "?w=480;800;1600&format=webp&as=img",
	},
);

export const PROJECTS: Project[] = [
	{
		title: "Pokédex",
		liveHref: "https://pokemon.haugestol.com",
		githubHref: "https://github.com/shift-primal/pdex_26",
		description:
			"Full National Pokédex on PokéAPI — virtualized search, evolution chains, per-form detail pages and advanced filtering.",
		images: pokemonScreenshots,
	},
	{
		title: "BFQ",
		liveHref: "https://quiz.haugestol.com",
		githubHref: "https://github.com/shift-primal/bfq",
		description:
			"A personal trivia quiz — how well do you know Kasper? Dynamically scored, store-based state, with a live leaderboard.",
		images: quizScreenshots,
	},
	{
		title: "Groovehaus",
		githubHref: "https://github.com/shift-primal/groovehaus",
		// liveHref: "https://example.com", - Not live
		description:
			"Marketplace for vinyl, gear, and instruments — cart, auth, and Stripe checkout.",
		images: groovehausScreenshots,
	},
];
