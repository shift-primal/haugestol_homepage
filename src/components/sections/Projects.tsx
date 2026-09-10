import { GithubLogoIcon } from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ProjectCard } from "#/components/sections/projects/ProjectCard";
import { Button } from "#/components/shadcn/button";
import { getProjects, SITE } from "#/content";
import { m } from "#/paraglide/messages";

export const Projects = () => {
    return (
        <SectionContainer sectionName="projects">
            <SectionHeading
                text={m.projects_heading()}
                kicker="// projects-showcase"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {getProjects().map((project) => (
                    <ProjectCard
                        key={project.title}
                        {...project}
                    />
                ))}
                <Button
                    variant="outline"
                    aria-label="GitHub"
                    nativeButton={false}
                    className="col-span-full gap-3"
                    render={(props) => (
                        <a
                            href={SITE.github}
                            target="_blank"
                            rel="noreferrer"
                            {...props}
                        >
                            {m.project_more_projects()}
                            <GithubLogoIcon />
                        </a>
                    )}
                />
            </div>
        </SectionContainer>
    );
};
