import { Link } from "@tanstack/react-router";
import { getCvLocation, SITE } from "#/content";
import { m } from "#/paraglide/messages";

const linkClassName =
    "underline-offset-4 outline-none hover:text-foreground hover:underline focus-ring";

export const Footer = () => {
    const location = getCvLocation();

    return (
        <footer className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-8 text-halo print:hidden">
            <div className="flex flex-col gap-6 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-foreground">
                        {m.footer_signoff()}
                    </p>
                    <p>
                        © {new Date().getFullYear()} {SITE.name}
                        {location && ` · ${location}`}
                    </p>
                </div>
                <nav
                    aria-label={m.footer_nav_aria()}
                    className="flex flex-wrap gap-x-5 gap-y-2"
                >
                    <Link
                        to="/projects"
                        className={linkClassName}
                    >
                        {m.projects_page_heading()}
                    </Link>
                    <Link
                        to="/cv"
                        className={linkClassName}
                    >
                        CV
                    </Link>
                    <a
                        href={SITE.github}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClassName}
                    >
                        GitHub
                    </a>
                    <a
                        href={SITE.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClassName}
                    >
                        LinkedIn
                    </a>
                </nav>
            </div>
        </footer>
    );
};
