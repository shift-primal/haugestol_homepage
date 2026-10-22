import {
    EnvelopeIcon,
    FileTextIcon,
    GithubLogoIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/shadcn/button";
import { SITE } from "#/content";
import { scrollBehavior } from "#/lib/scroll";
import { m } from "#/paraglide/messages";

const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
        behavior: scrollBehavior(),
    });

export const HeroActions = () => (
    <div className="flex flex-wrap items-center gap-3 pointer-events-auto w-fit">
        <Button onClick={() => scrollToSection("projects")}>
            {m.hero_projects_button()}
        </Button>
        <Button
            variant="outline"
            nativeButton={false}
            render={(props) => (
                <Link
                    {...props}
                    to="/cv"
                >
                    <span>{m.hero_resume()}</span>
                    <FileTextIcon data-icon="inline-end" />
                </Link>
            )}
        />
        <Button
            variant="outline"
            size="icon-lg"
            aria-label="GitHub"
            nativeButton={false}
            render={(props) => (
                <a
                    href={SITE.github}
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                >
                    <GithubLogoIcon />
                </a>
            )}
        />
        <Button
            variant="outline"
            size="icon-lg"
            aria-label={m.hero_contact_aria()}
            onClick={() => scrollToSection("contact")}
        >
            <EnvelopeIcon />
        </Button>
    </div>
);
