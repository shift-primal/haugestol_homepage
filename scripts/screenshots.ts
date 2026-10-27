import { execSync } from "node:child_process";
import { createHmac } from "node:crypto";
import { mkdirSync } from "node:fs";
import { chromium, type Page } from "playwright";

interface Shot {
    name: string;
    path: string;
    stage?: (page: Page) => Promise<void>;
}

interface Target {
    folder: string;
    baseUrl: string;
    colorScheme: "light" | "dark";
    locale?: string;
    width?: number;
    localStorage?: Record<string, string>;
    setup?: (page: Page) => Promise<void>;
    shots: Shot[];
    explicitOnly?: boolean;
}

const OUT_DIR = "src/assets/screenshots/projects";
const GRONT_LYS_URL = process.env.GRONT_LYS_URL ?? "http://localhost:3000";
const KLYNDRE_URL = process.env.KLYNDRE_URL ?? "http://localhost:3001";
const KLYNDRE_GUILD_ID = "1339339272926265344";

const TARGETS: Target[] = [
    {
        folder: "pokemon",
        baseUrl: "https://pokemon.haugestol.com",
        colorScheme: "light",
        width: 1920,
        shots: [
            {
                name: "01-pokemon-home",
                path: "/",
            },
            {
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
        baseUrl: GRONT_LYS_URL,
        colorScheme: "dark",
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
                stage: async (page) => {
                    await page.getByText("Slakk dobbeltpedal i bil 3").click();
                    await settle(page);
                },
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
        folder: "klyndre",
        baseUrl: KLYNDRE_URL,
        colorScheme: "light",
        setup: signInKlyndre,
        explicitOnly: true,
        shots: [
            {
                name: "01-klyndre-settings",
                path: `/guilds/${KLYNDRE_GUILD_ID}/settings`,
            },
            {
                name: "02-klyndre-character",
                path: `/guilds/${KLYNDRE_GUILD_ID}/character`,
            },
            {
                name: "03-klyndre-replies",
                path: `/guilds/${KLYNDRE_GUILD_ID}/settings`,
                stage: async (page) => {
                    await page
                        .getByRole("tab", {
                            name: "Replies",
                        })
                        .click();
                    await settle(page);
                },
            },
            {
                name: "04-klyndre-memory",
                path: `/guilds/${KLYNDRE_GUILD_ID}/settings`,
                stage: async (page) => {
                    await page
                        .getByRole("tab", {
                            name: "Memory",
                        })
                        .click();
                    await settle(page);
                },
            },
        ],
    },
    {
        folder: "office-off",
        baseUrl: "http://localhost:8000",
        colorScheme: "light",
        locale: "nb-NO",
        explicitOnly: true,
        shots: [
            {
                name: "01-office-off-product",
                path: "/produkt/trenchcoat?farge=Beige",
            },
            {
                name: "02-office-off-home",
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
                name: "03-office-off-listing",
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
        ],
    },
];

const CLEANUP_CSS = `
    * { scrollbar-width: none !important; caret-color: transparent !important; }
    *::-webkit-scrollbar { display: none !important; }
    [data-testid="tanstack_devtools"] { display: none !important; }
`;

const settle = async (page: Page) => {
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

const hoverChart = async (page: Page) => {
    const chart = page.locator(".recharts-surface").first();
    const box = await chart.boundingBox();
    if (!box) return;
    await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.5);
    await page.waitForTimeout(400);
};

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
    const baseUrl = GRONT_LYS_URL;
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

const KLYNDRE_DEMO_PASSWORD = process.env.KLYNDRE_DEMO_PASSWORD ?? "";

async function signInKlyndre(page: Page) {
    if (!KLYNDRE_DEMO_PASSWORD) {
        throw new Error("set KLYNDRE_DEMO_PASSWORD to sign in");
    }
    const signIn = await page.request.post(
        `${KLYNDRE_URL}/api/auth/sign-in/email`,
        {
            headers: {
                origin: KLYNDRE_URL,
            },
            data: {
                email: "demo@example.com",
                password: KLYNDRE_DEMO_PASSWORD,
            },
        }
    );
    if (!signIn.ok()) throw new Error(`sign-in failed: ${signIn.status()}`);
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
    const width = target.width ?? 1280;
    const context = await browser.newContext({
        viewport: {
            width,
            height: (width * 9) / 16,
        },
        deviceScaleFactor: 2560 / width,
        colorScheme: target.colorScheme,
        reducedMotion: "reduce",
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
