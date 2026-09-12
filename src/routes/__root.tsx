import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Filter } from "#/components/layout/Filter";
import { Header } from "#/components/layout/Header";
import { NotFound } from "#/components/layout/NotFound";
import { PageLoader } from "#/components/layout/PageLoader";
import { ScrollToTopButton } from "#/components/ui/ScrollToTopButton";
import { SITE } from "#/content";
import { PAGE_SCROLL_CONTAINER_ID } from "#/lib/scroll";
import { m } from "#/paraglide/messages";
import {
    baseLocale,
    getLocale,
    locales,
    localizeHref,
} from "#/paraglide/runtime";
import appCss from "../styles.css?url";

const SITE_ORIGIN = "https://haugestol.com";

const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE_ORIGIN,
    image: `${SITE_ORIGIN}/og-image.png`,
    jobTitle: "Full-Stack Developer",
    email: `mailto:${SITE.email}`,
    sameAs: [
        SITE.github,
        SITE.linkedin,
    ],
};

const RootDocument = ({ children }: { children: React.ReactNode }) => {
    return (
        <html
            lang={getLocale()}
            suppressHydrationWarning
        >
            <head>
                <HeadContent />
            </head>
            <body className="overflow-hidden">
                <ThemeProvider attribute="class">
                    <div className="fixed inset-0 flex flex-col">
                        <div
                            id={PAGE_SCROLL_CONTAINER_ID}
                            className="min-h-0 flex-1 overflow-y-auto overflow-x-clip relative w-full"
                        >
                            <Header />
                            <main>{children}</main>
                        </div>
                    </div>
                    <Filter />
                    <PageLoader />
                    <ScrollToTopButton />
                </ThemeProvider>
                <Scripts />
            </body>
        </html>
    );
};

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "Kasper Haugestøl - Full-Stack Developer",
            },
            {
                name: "description",
                content: m.meta_description(),
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                property: "og:url",
                content: `${SITE_ORIGIN}${localizeHref("/")}`,
            },
            {
                property: "og:title",
                content: "Kasper Haugestøl - Full-Stack Developer",
            },
            {
                property: "og:description",
                content: m.meta_description(),
            },
            {
                property: "og:image",
                content: `${SITE_ORIGIN}/og-image.png`,
            },
            {
                name: "twitter:card",
                content: "summary_large_image",
            },
            {
                name: "twitter:title",
                content: "Kasper Haugestøl - Full-Stack Developer",
            },
            {
                name: "twitter:description",
                content: m.meta_description(),
            },
            {
                name: "twitter:image",
                content: `${SITE_ORIGIN}/og-image.png`,
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "96x96",
                href: "/favicon-96x96.png",
            },
            {
                rel: "icon",
                type: "image/svg+xml",
                href: "/favicon.svg",
            },
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico",
            },
            {
                rel: "apple-touch-icon",
                href: "/apple-touch-icon.png",
            },
            {
                rel: "manifest",
                href: "/site.webmanifest",
            },
            {
                rel: "canonical",
                href: `${SITE_ORIGIN}${localizeHref("/")}`,
            },
            ...locales.map((locale) => ({
                rel: "alternate",
                hrefLang: locale,
                href: `${SITE_ORIGIN}${localizeHref("/", {
                    locale,
                })}`,
            })),
            {
                rel: "alternate",
                hrefLang: "x-default",
                href: `${SITE_ORIGIN}${localizeHref("/", {
                    locale: baseLocale,
                })}`,
            },
        ],
        scripts: [
            {
                type: "application/ld+json",
                children: JSON.stringify(personSchema),
            },
        ],
    }),
    shellComponent: RootDocument,
    notFoundComponent: NotFound,
});
