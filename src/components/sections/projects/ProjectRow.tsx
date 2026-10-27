import {
    ArrowUpRightIcon,
    ChatCircleTextIcon,
    GithubLogoIcon,
    LockSimpleIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { ProjectGallery } from "#/components/sections/projects/ProjectGallery";
import { Button } from "#/components/shadcn/button";
import type { Project } from "#/content";
import { requestContactPrefill } from "#/lib/contact-prefill";
import { scrollBehavior } from "#/lib/scroll";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";

export const ProjectRow = ({
    project,
    featured = false,
    headingLevel: HeadingTag = "h3",
}: {
    project: Project;
    featured?: boolean;
    headingLevel?: "h2" | "h3";
}) => {
    const {
        title,
        subtitle,
        description,
        status,
        tech,
        links,
        githubHref,
        isPrivate,
        demoOnRequest,
        images,
    } = project;
    const navigate = useNavigate();

    const requestDemo = () => {
        requestContactPrefill(
            m.project_demo_message({
                title,
            })
        );
        const contact = document.getElementById("contact");
        if (contact) {
            contact.scrollIntoView({
                behavior: scrollBehavior(),
            });
        } else {
            navigate({
                to: "/",
                hash: "contact",
            });
        }
    };

    return (
        <article
            className={cn(
                "grid items-start gap-6 pointer-events-auto",
                featured
                    ? "lg:grid-cols-12 lg:gap-12"
                    : "md:grid-cols-12 md:gap-10"
            )}
        >
            <div className={featured ? "lg:col-span-7" : "md:col-span-5"}>
                <ProjectGallery
                    title={title}
                    images={images}
                    isPrivate={isPrivate}
                />
            </div>

            <div
                className={cn(
                    "flex flex-col gap-4",
                    featured ? "lg:col-span-5" : "md:col-span-7"
                )}
            >
                <div className="flex flex-col gap-1">
                    <HeadingTag
                        className={cn(
                            "font-extrabold tracking-tight",
                            featured
                                ? "text-4xl leading-none lg:text-5xl"
                                : "text-2xl"
                        )}
                    >
                        {title}
                    </HeadingTag>
                    {subtitle && (
                        <p
                            className={cn(
                                "text-foreground/80",
                                featured
                                    ? "mt-2 text-sm sm:text-base"
                                    : "text-sm"
                            )}
                        >
                            {subtitle}
                        </p>
                    )}
                    {status && (
                        <p className="text-xs text-muted-foreground">
                            {status}
                        </p>
                    )}
                </div>

                <p className="max-w-[62ch] font-sans text-[0.9375rem] leading-[1.65] text-pretty text-muted-foreground">
                    {description}
                </p>

                {tech && (
                    <p className="text-xs text-muted-foreground">
                        {tech.join(" · ")}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-2">
                    {demoOnRequest && (
                        <Button onClick={requestDemo}>
                            <span>{m.project_request_demo()}</span>
                            <ChatCircleTextIcon data-icon="inline-end" />
                        </Button>
                    )}
                    {links.map((link, index) => (
                        <Button
                            key={link.href}
                            variant={
                                featured && index === 0 ? "default" : "outline"
                            }
                            nativeButton={false}
                            render={(props) => (
                                <a
                                    {...props}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>{link.label}</span>
                                    <ArrowUpRightIcon data-icon="inline-end" />
                                </a>
                            )}
                        />
                    ))}
                    {githubHref && (
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label={m.project_github_aria({
                                title,
                            })}
                            nativeButton={false}
                            render={(props) => (
                                <a
                                    {...props}
                                    href={githubHref}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <GithubLogoIcon />
                                </a>
                            )}
                        />
                    )}
                    {isPrivate && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <LockSimpleIcon
                                aria-hidden
                                className="size-3.5"
                            />
                            {m.project_private()}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};
