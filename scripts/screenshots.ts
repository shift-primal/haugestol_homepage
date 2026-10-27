// Captures the project screenshots in src/assets/screenshots/projects/ so
// they can be retaken after a redesign instead of cropped by hand. Every shot
// is the 1280×720 viewport at 2× (2560×1440, exactly 16:9) with motion off.
//
//   pnpm screenshots                  every target that's reachable
//   pnpm screenshots ws bfq           only these folders
//
// Local targets are skipped unless their dev server is up. Shots not listed
// here (the npm page, ws import preview) are left as they are. Set CHROME_PATH if Playwright's own Chromium won't run (NixOS).

import { execSync } from "node:child_process";
import { createHmac } from "node:crypto";
import { mkdirSync } from "node:fs";
import { chromium, type Page } from "playwright";

interface Shot {
    name: string;
    path: string;
    // stage the page after it's loaded: open a dialog, hover a chart, …
    stage?: (page: Page) => Promise<void>;
}

interface Target {
    folder: string;
    baseUrl: string;
    colorScheme: "light" | "dark";
    locale?: string;
    // seeded before any page script runs, e.g. a stored theme
    localStorage?: Record<string, string>;
    // runs once before the shots, e.g. to sign in
    setup?: (page: Page) => Promise<void>;
    shots: Shot[];
    // only run when named on the command line
    explicitOnly?: boolean;
}

const OUT_DIR = "src/assets/screenshots/projects";

const TARGETS: Target[] = [
    {
        folder: "bfq",
        baseUrl: "https://quiz.haugestol.com",
        colorScheme: "dark",
        locale: "nb-NO",
        // ignores the system theme, only follows its own toggle
        localStorage: {
            theme: "dark",
        },
        shots: [
            {
                name: "01-bfq-home",
                path: "/",
            },
            {
                name: "02-bfq-in-progress",
                path: "/quiz/start",
                stage: async (page) => {
                    await page.getByPlaceholder("Kasper...").fill("Kasper");
                    await page
                        .getByRole("button", {
                            name: "Neste",
                        })
                        .click();
                    await settle(page);
                },
            },
            {
                name: "03-bfq-leaderboard",
                path: "/leaderboard",
            },
        ],
    },
    {
        folder: "pokemon",
        baseUrl: "https://pokemon.haugestol.com",
        colorScheme: "light",
        shots: [
            {
                name: "01-pokemon-home",
                path: "/",
            },
            {
                // the hero fills a 16:9 viewport, so the featured grid
                // gets its own shot
                name: "02-pokemon-featured",
                path: "/",
                stage: async (page) => {
                    await page
                        .locator("section", {
                            has: page.getByRole("heading", {
                                name: "Featured",
                            }),
                        })
                        .evaluate((section) =>
                            section.scrollIntoView({
                                block: "center",
                            })
                        );
                    await settle(page);
                },
            },
            {
                name: "03-pokemon-details",
                path: "/pokemon/charizard?tab=about",
            },
            {
                name: "04-pokemon-list",
                path: "/pokemon",
            },
        ],
    },
    {
        folder: "spot",
        baseUrl: "https://spot.haugestol.com",
        colorScheme: "light",
        shots: [
            // joining is remembered, so the welcome dialog goes first
            {
                name: "002-spot-welcome",
                path: "/",
            },
            {
                name: "003-spot-minimap",
                path: "/",
                stage: async (page) => {
                    await page.getByPlaceholder("Your name").fill("Kasper");
                    await page
                        .getByRole("button", {
                            name: "Join",
                        })
                        .click();
                    await page
                        .getByRole("button", {
                            name: "Show map",
                        })
                        .click();
                    await settle(page);
                },
            },
            {
                // the synthwave sunset drawn at world (14000, 16000); the
                // camera is read from localStorage on load, and spot saves
                // its own on unload, so it's set before the next load
                name: "001-spot-sunset",
                path: "/",
                stage: async (page) => {
                    await page.addInitScript(() =>
                        localStorage.setItem(
                            "spot:camera",
                            JSON.stringify({
                                x: 14000,
                                y: 16000,
                                zoom: 1,
                            })
                        )
                    );
                    await page.reload();
                    await settle(page);
                },
            },
        ],
    },
    {
        // the npm page (01) sits behind a Cloudflare bot check, so it's by hand
        folder: "txcategorizer",
        baseUrl: "https://github.com",
        colorScheme: "dark",
        shots: [
            {
                name: "02-txcategorizer-github",
                path: "/shift-primal/txcategorizer",
            },
        ],
    },
    {
        folder: "ws",
        baseUrl: "https://ws.haugestol.com",
        colorScheme: "dark",
        shots: [
            // signed out, so it goes first
            {
                name: "05-ws-home",
                path: "/",
            },
            {
                name: "01-ws-dashboard",
                path: "/dashboard",
                stage: async (page) => {
                    await signInWsDemo(page);
                    await hoverChart(page);
                },
            },
            {
                name: "03-ws-import",
                path: "/import",
            },
            // last, since the light scheme sticks for the rest of the page
            {
                name: "02-ws-dashboardlight",
                path: "/dashboard",
                stage: async (page) => {
                    await page.emulateMedia({
                        colorScheme: "light",
                    });
                    await hoverChart(page);
                },
            },
        ],
    },
    {
        folder: "gront-lys",
        baseUrl: "http://localhost:3000",
        colorScheme: "light",
        locale: "nb-NO",
        setup: signInGrontLys,
        shots: [
            {
                name: "01-gront-lys-i-dag",
                path: "/s/trafikkskole-nord/i-dag",
            },
            {
                name: "02-gront-lys-saker",
                path: "/s/trafikkskole-nord/saker",
            },
            {
                name: "03-gront-lys-klasser",
                path: "/s/trafikkskole-nord/laerere/klasser",
            },
            {
                name: "04-gront-lys-arsplan",
                path: "/s/trafikkskole-nord/arsplan",
            },
        ],
    },
    {
        // the seeded catalogue uses Zalando's photos, which mustn't be
        // published, so this only runs on request (pnpm screenshots office-off)
        folder: "office-off",
        baseUrl: "http://localhost:8000",
        colorScheme: "light",
        locale: "nb-NO",
        explicitOnly: true,
        shots: [
            {
                // the split hero is taller than the viewport, so show its
                // lower half with both line panels
                name: "01-office-off-home",
                path: "/",
                stage: async (page) => {
                    await page
                        .locator("section", {
                            has: page.getByRole("heading", {
                                name: "Office",
                                exact: true,
                            }),
                        })
                        .evaluate((section) =>
                            section.scrollIntoView({
                                block: "end",
                            })
                        );
                    await settle(page);
                },
            },
            {
                // scrolled past the line banner to the product grid
                name: "02-office-off-listing",
                path: "/office/herre",
                stage: async (page) => {
                    await page
                        .getByText(/^\d+ produkter$/)
                        .evaluate((count) => {
                            count.scrollIntoView({
                                block: "start",
                            });
                            window.scrollBy(0, -90);
                        });
                    await settle(page);
                },
            },
            {
                name: "03-office-off-product",
                path: "/produkt/trenchcoat?farge=Beige",
            },
        ],
    },
];

// hides scrollbars and the text caret, which otherwise blink into shots, and
// the TanStack devtools button local dev servers show
const CLEANUP_CSS = `
    * { scrollbar-width: none !important; caret-color: transparent !important; }
    *::-webkit-scrollbar { display: none !important; }
    [data-testid="tanstack_devtools"] { display: none !important; }
`;

const settle = async (page: Page) => {
    // sockets and polling keep some pages from ever going idle
    await page
        .waitForLoadState("networkidle", {
            timeout: 10_000,
        })
        .catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
};

const signInWsDemo = async (page: Page) => {
    await page.goto("https://ws.haugestol.com/auth/sign-in");
    await page
        .getByRole("button", {
            name: "Demo account 1",
        })
        .click();
    await page.waitForURL(/\/dashboard/);
    await settle(page);
};

// shows the tooltip on the monthly trend chart, roughly at the second-last month
const hoverChart = async (page: Page) => {
    const chart = page.locator(".recharts-surface").first();
    const box = await chart.boundingBox();
    if (!box) return;
    await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.5);
    await page.waitForTimeout(400);
};

// demo accounts share one TOTP key derived from DEMO_PASSWORD (see
// gront-lys-app packages/db/src/seed/demo-key.ts); pass that repo's
// DEMO_PASSWORD as GRONT_LYS_DEMO_PASSWORD so it stays out of this repo
const GRONT_LYS_DEMO_PASSWORD = process.env.GRONT_LYS_DEMO_PASSWORD ?? "";

const totpCode = (key: Buffer) => {
    const counter = Buffer.alloc(8);
    counter.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30_000)));
    const mac = createHmac("sha1", key).update(counter).digest();
    const offset = (mac.at(-1) ?? 0) & 15;
    return String((mac.readUInt32BE(offset) & 0x7fffffff) % 1_000_000).padStart(
        6,
        "0"
    );
};

async function signInGrontLys(page: Page) {
    if (!GRONT_LYS_DEMO_PASSWORD) {
        throw new Error("set GRONT_LYS_DEMO_PASSWORD to sign in");
    }
    const baseUrl = "http://localhost:3000";
    const headers = {
        origin: baseUrl,
    };
    const signIn = await page.request.post(
        `${baseUrl}/api/auth/sign-in/email`,
        {
            headers,
            data: {
                email: "silje@example.no",
                password: GRONT_LYS_DEMO_PASSWORD,
            },
        }
    );
    if (!signIn.ok()) throw new Error(`sign-in failed: ${signIn.status()}`);
    const key = createHmac("sha256", GRONT_LYS_DEMO_PASSWORD)
        .update("gront-lys demo totp")
        .digest("hex")
        .slice(0, 32);
    const verify = await page.request.post(
        `${baseUrl}/api/auth/two-factor/verify-totp`,
        {
            headers,
            data: {
                code: totpCode(Buffer.from(key, "utf8")),
            },
        }
    );
    if (!verify.ok()) throw new Error(`2FA failed: ${verify.status()}`);
}

const isReachable = async (url: string) => {
    try {
        await fetch(url, {
            signal: AbortSignal.timeout(3000),
        });
        return true;
    } catch {
        return false;
    }
};

const findChrome = () => {
    if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
    try {
        return execSync("command -v google-chrome chromium", {
            encoding: "utf8",
        })
            .split("\n")[0]
            .trim();
    } catch {
        // fall back to Playwright's bundled Chromium
        return undefined;
    }
};

const requested = process.argv.slice(2);
const targets = TARGETS.filter((target) =>
    requested.length > 0
        ? requested.includes(target.folder)
        : !target.explicitOnly
);

const browser = await chromium.launch({
    executablePath: findChrome(),
});

for (const target of targets) {
    if (!(await isReachable(target.baseUrl))) {
        console.log(`skip ${target.folder}: ${target.baseUrl} isn't up`);
        continue;
    }
    const context = await browser.newContext({
        viewport: {
            width: 1280,
            height: 720,
        },
        deviceScaleFactor: 2,
        colorScheme: target.colorScheme,
        reducedMotion: "reduce",
        // lets CLEANUP_CSS in on pages with a strict CSP
        bypassCSP: true,
        locale: target.locale ?? "en-US",
    });
    if (target.localStorage) {
        await context.addInitScript((entries) => {
            for (const [key, value] of Object.entries(entries)) {
                localStorage.setItem(key, value);
            }
        }, target.localStorage);
    }
    const page = await context.newPage();
    const dir = `${OUT_DIR}/${target.folder}`;
    mkdirSync(dir, {
        recursive: true,
    });

    try {
        await target.setup?.(page);
        for (const shot of target.shots) {
            await page.goto(new URL(shot.path, target.baseUrl).href);
            await page.addStyleTag({
                content: CLEANUP_CSS,
            });
            await settle(page);
            await shot.stage?.(page);
            await page.screenshot({
                path: `${dir}/${shot.name}.png`,
            });
            console.log(`  ${dir}/${shot.name}.png`);
        }
    } catch (error) {
        console.error(`fail ${target.folder}:`, error);
        process.exitCode = 1;
    } finally {
        await context.close();
    }
}

await browser.close();
