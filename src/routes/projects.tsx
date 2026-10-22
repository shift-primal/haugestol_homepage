import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpRightIcon,
    GithubLogoIcon,
} from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectRow } from "#/components/sections/projects/ProjectRow";
import { Button } from "#/components/shadcn/button";
import { getAllProjects, SITE } from "#/content";
import { absoluteUrl, localizedPageLinks } from "#/lib/seo";
import { m } from "#/paraglide/messages";

const ProjectsPage = () => (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 p-4 pt-24 pb-16 sm:p-8 sm:pt-24 lg:pt-32">
        <div className="flex flex-col items-start gap-6">
            <Button
                variant="ghost"
                nativeButton={false}
                className="-ml-2.5"
                render={(props) => (
                    <Link
                        {...props}
                        to="/"
                    >
                        <ArrowLeftIcon data-icon="inline-start" />
                        <span>{m.back_home()}</span>
                    </Link>
                )}
            />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {m.projects_page_heading()}
            </h1>
        </div>

        <div className="flex flex-col gap-12">
            {getAllProjects().map((project, index) => (
                <div
                    key={project.id}
                    className={
                        index > 0 ? "border-t border-border pt-12" : undefined
                    }
                >
                    <ProjectRow
                        project={project}
                        headingLevel="h2"
                    />
                </div>
            ))}
        </div>

        {/* end on the next step, not a dead end */}
        <div className="flex flex-col gap-4 border-t border-border pt-12">
            <p className="text-xl font-bold tracking-tight">
                {m.projects_contact_heading()}
            </p>
            <div className="flex flex-wrap gap-3">
                <Button
                    nativeButton={false}
                    render={(props) => (
                        <Link
                            {...props}
                            to="/"
                            hash="contact"
                        >
                            <span>{m.projects_contact_button()}</span>
                            <ArrowRightIcon data-icon="inline-end" />
                        </Link>
                    )}
                />
                <Button
                    variant="outline"
                    nativeButton={false}
                    className="gap-3"
                    render={(props) => (
                        <a
                            {...props}
                            href={SITE.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GithubLogoIcon data-icon="inline-start" />
                            <span>{m.project_more_projects()}</span>
                            <ArrowUpRightIcon data-icon="inline-end" />
                        </a>
                    )}
                />
            </div>
        </div>
    </div>
);

export const Route = createFileRoute("/projects")({
    head: () => ({
        meta: [
            {
                title: m.projects_meta_title(),
            },
            {
                name: "description",
                content: m.projects_meta_description(),
            },
            {
                property: "og:url",
                content: absoluteUrl("/projects"),
            },
            {
                property: "og:title",
                content: m.projects_meta_title(),
            },
            {
                property: "og:description",
                content: m.projects_meta_description(),
            },
        ],
        links: localizedPageLinks("/projects"),
    }),
    component: ProjectsPage,
});
