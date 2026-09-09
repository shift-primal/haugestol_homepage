import { paraglideVitePlugin } from "@inlang/paraglide-js";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

const config = defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        devtools(),
        nitro({
            rollupConfig: {
                external: [
                    /^@sentry\//,
                ],
            },
        }),
        tailwindcss(),
        paraglideVitePlugin({
            project: "./project.inlang",
            outdir: "./src/paraglide",
            outputStructure: "message-modules",
            cookieName: "PARAGLIDE_LOCALE",
            strategy: [
                "url",
                "cookie",
                "preferredLanguage",
                "baseLocale",
            ],
            urlPatterns: [
                {
                    pattern: "/",
                    localized: [
                        [
                            "en",
                            "/en",
                        ],
                        [
                            "no",
                            "/",
                        ],
                    ],
                },
                {
                    pattern: "/:path(.*)?",
                    localized: [
                        [
                            "en",
                            "/en/:path(.*)?",
                        ],
                        [
                            "no",
                            "/:path(.*)?",
                        ],
                    ],
                },
            ],
        }),
        tanstackStart(),
        viteReact(),
        babel({
            presets: [
                reactCompilerPreset(),
            ],
        }),
        imagetools(),
    ],
});

export default config;
