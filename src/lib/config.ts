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
	"Short bio goes here — background, what you focus on, what you're looking for.";

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
		title: "Project 1",
		liveHref: "https://pokemon.haugestol.com",
		githubHref: "https://github.com/shift-primal/pdex_26",
		description: "Cool project 1",
		images: pokemonScreenshots,
	},
	{
		title: "Project 2",
		liveHref: "https://quiz.haugestol.com",
		githubHref: "https://github.com/shift-primal/bfq",
		description: "Cool project 2",
		images: quizScreenshots,
	},
	{
		title: "Project 3",
		// liveHref: "https://example.com", - Not live
		description: "Cool project 3",
		images: groovehausScreenshots,
	},
];
