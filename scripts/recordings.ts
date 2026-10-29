import { execSync } from "node:child_process";
import { createHmac } from "node:crypto";
import {
    linkSync,
    mkdirSync,
    mkdtempSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium, type Locator, type Page } from "playwright";

// Records short demo clips (MP4, WebM and GIF) of a scripted flow through an app.
// Chrome's screencast saves every painted frame with its timestamp, then the frames are
// put back on a 30 fps timeline: rec.wait() collapses loading to a blink and rec.speed()
// speeds up what follows, so the clip stays short without looking rushed.
//
//   node scripts/recordings.ts gront-lys
//   node scripts/recordings.ts gront-lys --reset   runs the target's reset first
//
// Needs ffmpeg on PATH.

interface Recorder {
    page: Page;
    speed: (factor: number) => void;
    wait: (fn: () => Promise<unknown>) => Promise<void>;
    pause: (ms: number) => Promise<void>;
    glide: (target: Locator, ms?: number) => Promise<void>;
    click: (target: Locator, ms?: number) => Promise<void>;
    type: (text: string, delay?: number) => Promise<void>;
    scrollTo: (target: Locator, ms?: number) => Promise<void>;
}

interface Target {
    folder: string;
    baseUrl: string;
    colorScheme: "light" | "dark";
    locale?: string;
    width?: number;
    reset?: {
        cwd: string;
        command: string;
    };
    warmup?: string[];
    start: string;
    run: (rec: Recorder) => Promise<void>;
}

const OUT_DIR = "src/assets/recordings/projects";
const FPS = 30;
const GRONT_LYS_URL = process.env.GRONT_LYS_URL ?? "http://localhost:3000";
const GRONT_LYS_DIR = process.env.GRONT_LYS_DIR ?? "../gront-lys-app";
const GRONT_LYS_DEMO_PASSWORD = process.env.GRONT_LYS_DEMO_PASSWORD ?? "";

const TARGETS: Target[] = [
    {
        folder: "gront-lys",
        baseUrl: GRONT_LYS_URL,
        colorScheme: "dark",
        locale: "nb-NO",
        // Closing a case changes the demo data, so a new take starts from a fresh seed.
        reset: {
            cwd: GRONT_LYS_DIR,
            command:
                "docker compose down -v && docker compose up -d --wait && sleep 3 && pnpm db:setup && pnpm db:seed",
        },
        warmup: [
            "/logg-inn",
            "/s/trafikkskole-nord/i-dag",
            "/s/trafikkskole-nord/saker/TEA-6?fra=i-dag",
        ],
        start: "/logg-inn",
        run: async (rec) => {
            const { page } = rec;
            if (!GRONT_LYS_DEMO_PASSWORD) {
                throw new Error("set GRONT_LYS_DEMO_PASSWORD to sign in");
            }
            rec.speed(1.2);
            await rec.click(page.getByLabel("E-post"), 380);
            await rec.type("silje@example.no", 22);
            await rec.click(
                page.getByLabel("Passord", {
                    exact: true,
                }),
                260
            );
            await rec.type(GRONT_LYS_DEMO_PASSWORD, 22);
            await rec.click(
                page.getByRole("button", {
                    name: "Logg inn",
                }),
                320
            );

            const code = page.getByLabel("Kode fra appen");
            await rec.wait(() => code.waitFor());
            await rec.pause(200);
            await rec.click(code, 300);
            await rec.type(grontLysTotp(), 35);
            await rec.click(
                page.getByRole("button", {
                    name: "Logg inn",
                }),
                300
            );

            const item = page.getByRole("link", {
                name: /TEA-6/,
            });
            await rec.wait(async () => {
                await page.waitForURL(/i-dag/);
                await item.waitFor();
                await settle(page);
            });
            rec.speed(1.5);
            await rec.pause(450);
            await rec.glide(
                page.getByRole("link", {
                    name: /Klasse C1/,
                }),
                350
            );
            await rec.scrollTo(item);
            await rec.pause(300);
            await rec.click(item, 420);

            const close = page.getByRole("button", {
                name: "Lukk saken",
            });
            await rec.wait(async () => {
                await close.waitFor();
                await settle(page);
            });
            rec.speed(1.2);
            await rec.pause(450);
            await rec.click(close, 420);
            const dialog = page.getByRole("dialog", {
                name: "Lukk saken",
            });
            await dialog.waitFor();
            await rec.pause(450);
            await rec.click(
                dialog.getByRole("button", {
                    name: "Lukk saken",
                }),
                380
            );

            await rec.wait(async () => {
                await page
                    .getByRole("dialog", {
                        name: "Saken er lukket",
                    })
                    .waitFor();
                await settle(page);
            });
            rec.speed(1);
            await rec.pause(1500);
        },
    },
];

// Headless Chrome draws no pointer, so the page gets one that follows the mouse.
const CURSOR_SCRIPT = () => {
    const svg =
        '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l15 11-6.5 1 3.8 7.5-2.6 1.3-3.8-7.6L5 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';
    const state = {
        x: -50,
        y: -50,
    };
    const cursor = () => {
        let el = document.getElementById("__cursor");
        if (!el) {
            el = document.createElement("div");
            el.id = "__cursor";
            el.innerHTML = svg;
            Object.assign(el.style, {
                position: "fixed",
                left: "0",
                top: "0",
                zIndex: "2147483647",
                pointerEvents: "none",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,.5))",
                transition: "scale .12s",
            });
            document.documentElement.appendChild(el);
        }
        el.style.transform = `translate(${state.x - 3}px, ${state.y - 2}px)`;
        return el;
    };
    window.addEventListener(
        "mousemove",
        (event) => {
            state.x = event.clientX;
            state.y = event.clientY;
            cursor();
        },
        true
    );
    window.addEventListener(
        "mousedown",
        () => (cursor().style.scale = "0.85"),
        true
    );
    window.addEventListener(
        "mouseup",
        () => (cursor().style.scale = "1"),
        true
    );
    new MutationObserver(() => cursor()).observe(document, {
        childList: true,
        subtree: true,
    });
};

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
};

const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

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

const grontLysTotp = () => {
    const key = createHmac("sha256", GRONT_LYS_DEMO_PASSWORD)
        .update("gront-lys demo totp")
        .digest("hex")
        .slice(0, 32);
    return totpCode(Buffer.from(key, "utf8"));
};

interface Frame {
    file: string;
    t: number;
}

interface Segment {
    from: number;
    to: number;
    speed: number;
}

type Session = Recorder & {
    finish: () => void;
};

const now = () => Date.now() / 1000;

const createRecorder = (page: Page, segments: Segment[]): Session => {
    const pos = {
        x: 900,
        y: 560,
    };
    let open = {
        from: now(),
        speed: 1,
    };
    const cut = (speed: number) => {
        const t = now();
        segments.push({
            from: open.from,
            to: t,
            speed: open.speed,
        });
        open = {
            from: t,
            speed,
        };
    };
    const pause = (ms: number) => page.waitForTimeout(ms);
    const glide = async (target: Locator, ms = 450) => {
        const box = await target.boundingBox();
        if (!box) throw new Error(`can't see ${target}`);
        const to = {
            x: box.x + box.width / 2,
            y: box.y + box.height / 2,
        };
        const from = {
            ...pos,
        };
        const steps = Math.max(1, Math.round(ms / 16));
        for (let i = 1; i <= steps; i++) {
            const e = ease(i / steps);
            pos.x = from.x + (to.x - from.x) * e;
            pos.y = from.y + (to.y - from.y) * e;
            await page.mouse.move(pos.x, pos.y);
            await pause(8);
        }
    };
    return {
        page,
        speed: (factor) => cut(factor),
        // Whatever happens inside shows as 0.1 s: the frame before, then the frame after.
        wait: async (fn) => {
            const speed = open.speed;
            cut(0);
            await fn();
            cut(speed);
        },
        pause,
        glide,
        click: async (target, ms) => {
            await glide(target, ms);
            await pause(90);
            await page.mouse.down();
            await pause(70);
            await page.mouse.up();
        },
        type: (text, delay = 25) =>
            page.keyboard.type(text, {
                delay,
            }),
        // Wheels until the target's bottom edge sits just above the fold.
        scrollTo: async (target, ms = 1000) => {
            const box = await target.boundingBox();
            const viewport = page.viewportSize();
            if (!box || !viewport) return;
            const distance = box.y + box.height - viewport.height + 40;
            if (distance <= 0) return;
            const steps = Math.max(1, Math.round(ms / 16));
            let done = 0;
            for (let i = 1; i <= steps; i++) {
                const want = Math.round(distance * ease(i / steps));
                await page.mouse.wheel(0, want - done);
                done = want;
                await pause(16);
            }
        },
        finish: () => cut(1),
    };
};

const render = (
    frames: Frame[],
    segments: Segment[],
    dir: string,
    name: string
) => {
    const times: number[] = [];
    for (const { from, to, speed } of segments) {
        if (speed === 0) {
            const n = Math.round(0.1 * FPS);
            for (let i = 0; i < n; i++) times.push(i < n - 1 ? from : to);
            continue;
        }
        const n = Math.round(((to - from) / speed) * FPS);
        for (let i = 0; i < n; i++) times.push(from + (i / FPS) * speed);
    }
    const seq = mkdtempSync(join(tmpdir(), "recording-seq-"));
    let j = 0;
    times.forEach((t, i) => {
        while (j + 1 < frames.length && frames[j + 1].t <= t) j++;
        linkSync(
            frames[j].file,
            join(seq, `${String(i).padStart(5, "0")}.jpg`)
        );
    });
    const input = `-framerate ${FPS} -i ${seq}/%05d.jpg`;
    const ffmpeg = (args: string) =>
        execSync(`ffmpeg -loglevel error -y ${input} ${args}`, {
            stdio: "inherit",
        });
    const out = `${dir}/${name}`;
    ffmpeg(
        `-vf scale=1920:1080:flags=lanczos -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart ${out}.mp4`
    );
    ffmpeg(
        `-vf scale=1920:1080:flags=lanczos -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 ${out}.webm`
    );
    ffmpeg(
        `-vf "fps=15,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" ${out}.gif`
    );
    rmSync(seq, {
        recursive: true,
        force: true,
    });
    console.log(
        `  ${out}.{mp4,webm,gif} (${(times.length / FPS).toFixed(1)}s)`
    );
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

const args = process.argv.slice(2);
const reset = args.includes("--reset");
const requested = args.filter((arg) => !arg.startsWith("--"));
const targets = TARGETS.filter(
    (target) => requested.length === 0 || requested.includes(target.folder)
);

const browser = await chromium.launch({
    executablePath: findChrome(),
});

for (const target of targets) {
    if (reset && target.reset) {
        execSync(target.reset.command, {
            cwd: target.reset.cwd,
            stdio: "inherit",
        });
    }
    const width = target.width ?? 1280;
    const context = await browser.newContext({
        viewport: {
            width,
            height: (width * 9) / 16,
        },
        deviceScaleFactor: 2560 / width,
        colorScheme: target.colorScheme,
        locale: target.locale ?? "en-US",
    });
    await context.addInitScript(CURSOR_SCRIPT);
    await context.addInitScript((css) => {
        document.addEventListener("DOMContentLoaded", () => {
            const style = document.createElement("style");
            style.textContent = css;
            document.head.appendChild(style);
        });
    }, CLEANUP_CSS);
    const page = await context.newPage();
    const dir = `${OUT_DIR}/${target.folder}`;
    mkdirSync(dir, {
        recursive: true,
    });
    const framesDir = mkdtempSync(join(tmpdir(), "recording-frames-"));

    try {
        // A dev server compiles a route on first visit; that shouldn't land in the clip.
        for (const path of target.warmup ?? []) {
            await page.goto(new URL(path, target.baseUrl).href);
            await settle(page);
        }
        await context.clearCookies();
        await page.goto(new URL(target.start, target.baseUrl).href);
        await settle(page);

        const cdp = await context.newCDPSession(page);
        const frames: Frame[] = [];
        cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
            const file = join(
                framesDir,
                `${String(frames.length).padStart(5, "0")}.jpg`
            );
            writeFileSync(file, Buffer.from(data, "base64"));
            frames.push({
                file,
                t: metadata.timestamp ?? now(),
            });
            cdp.send("Page.screencastFrameAck", {
                sessionId,
            }).catch(() => {});
        });
        await cdp.send("Page.startScreencast", {
            format: "jpeg",
            quality: 95,
            maxWidth: 2560,
            maxHeight: 1440,
        });
        await page.waitForTimeout(400);

        const segments: Segment[] = [];
        const rec = createRecorder(page, segments);
        await target.run(rec);
        rec.finish();
        await cdp.send("Page.stopScreencast");
        render(frames, segments, dir, `${target.folder}-demo`);
    } catch (error) {
        console.error(`fail ${target.folder}:`, error);
        process.exitCode = 1;
    } finally {
        await context.close();
        rmSync(framesDir, {
            recursive: true,
            force: true,
        });
    }
}

await browser.close();
