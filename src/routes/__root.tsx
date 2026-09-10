// import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";
import { Filter } from "#/components/layout/Filter";
import { Header } from "#/components/layout/Header";
import { PageLoader } from "#/components/layout/PageLoader";
import { m } from "#/paraglide/messages";
import {
    baseLocale,
    getLocale,
    locales,
    localizeHref,
} from "#/paraglide/runtime";
import appCss from "../styles.css?url";

const SITE_ORIGIN = "https://haugestol.com";

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
                    <Header />
                    <div className="fixed inset-0 flex flex-col">
                        <main className="min-h-0 flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </div>
                    <Filter />
                    <PageLoader />
                </ThemeProvider>
                {/* <TanStackDevtools */}
                {/* 	plugins={[ */}
                {/* 		{ */}
                {/* 			name: "Tanstack Router", */}
                {/* 			render: <TanStackRouterDevtoolsPanel />, */}
                {/* 		}, */}
                {/* 	]} */}
                {/* /> */}
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
                title: "Haugestol",
            },
            {
                name: "description",
                content: m.meta_description(),
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
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
    }),
    shellComponent: RootDocument,
});
