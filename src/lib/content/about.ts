import { m } from "#/paraglide/messages";

export interface AboutContent {
    bio: string;
}

export const getAbout = (): AboutContent => ({
    bio: m.about_bio(),
});
