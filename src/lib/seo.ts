import { baseLocale, locales, localizeHref } from "#/paraglide/runtime";

export const SITE_ORIGIN = "https://haugestol.com";

export const absoluteUrl = (path: string) =>
    `${SITE_ORIGIN}${localizeHref(path)}`;

// canonical + hreflang alternates for one page; each route adds its own,
// since TanStack merges <link> tags from every matched route
export const localizedPageLinks = (path: string) => [
    {
        rel: "canonical",
        href: absoluteUrl(path),
    },
    ...locales.map((locale) => ({
        rel: "alternate",
        hrefLang: locale,
        href: `${SITE_ORIGIN}${localizeHref(path, {
            locale,
        })}`,
    })),
    {
        rel: "alternate",
        hrefLang: "x-default",
        href: `${SITE_ORIGIN}${localizeHref(path, {
            locale: baseLocale,
        })}`,
    },
];
