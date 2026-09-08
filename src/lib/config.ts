import type { Img } from "vite-imagetools";

// Hero

export const NAME = "Kasper Haugestøl";

export const GITHUB_LINK = "https://github.com/shift-primal";

export const EMAIL = "kasper@haugestol.com";

export const TAGLINE =
	"Bygger grensesnitt folk faktisk liker å bruke — fra idé til produksjon.";

export const TECHNOLOGIES_SHOWCASE = [
	"Full-Stack",
	"TypeScript",
	"React",
	"Database",
	"DevOps",
];

// About

export const BIO =
	"Fullstack-utvikler med frontend-fokus, under utdanning ved GET Academy. Jeg bygger grensesnitt jeg selv ville likt å bruke, og bryr meg like mye om hvordan koden er strukturert under panseret. Går raskt fra idé til produksjon — flere av verktøyene mine er open source, og jeg drifter selv prosjektene mine helt ut i den andre enden.";

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
			"Full Pokédex bygget på PokéAPI — virtualized search, evolution chains, per-form details og avansert filtrering.",
		images: pokemonScreenshots,
	},
	{
		title: "BFQ",
		liveHref: "https://quiz.haugestol.com",
		githubHref: "https://github.com/shift-primal/bfq",
		description:
			"Personlig trivia quiz — hvor godt kjenner du Kasper? Dynamisk score, store-based state, med live leaderboard.",
		images: quizScreenshots,
	},
	{
		title: "Groovehaus",
		githubHref: "https://github.com/shift-primal/groovehaus",
		// liveHref: "https://example.com", - Not live
		description:
			"Et konsept for en nettbutikk for vinyl, musikkutstyr, og instrumenter — handlevogn, auth, og Stripe checkout.",
		images: groovehausScreenshots,
	},
];
