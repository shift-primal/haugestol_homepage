import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ProjectRow } from "#/components/sections/projects/ProjectRow";
import { Button } from "#/components/shadcn/button";
import { getAllProjects, getCvProjects } from "#/content";
import { m } from "#/paraglide/messages";

export const Projects = () => {
    const [featured, ...rest] = getCvProjects();

    return (
        <SectionContainer sectionName="projects">
            <SectionHeading text={m.projects_heading()} />
            <div className="flex flex-col gap-16">
                {featured && (
                    <ProjectRow
                        project={featured}
                        featured
                    />
                )}
                <div className="flex flex-col gap-12 border-t border-border pt-12">
                    {rest.map((project) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
                <Button
                    variant="outline"
                    nativeButton={false}
                    className="w-fit"
                    render={(props) => (
                        <Link
                            {...props}
                            to="/projects"
                        >
                            <span>
                                {m.projects_all({
                                    count: getAllProjects().length,
                                })}
                            </span>
                            <ArrowRightIcon data-icon="inline-end" />
                        </Link>
                    )}
                />
            </div>
        </SectionContainer>
    );
};
