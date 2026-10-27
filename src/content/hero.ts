import { m } from "#/paraglide/messages";

export interface HeroContent {
    tagline: string;
}

export const getHero = (): HeroContent => ({
    tagline: m.hero_tagline(),
});
