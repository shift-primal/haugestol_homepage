import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ProjectCard } from "#/components/sections/projects/ProjectCard";
import { PROJECTS } from "#/lib/content";
import { m } from "#/paraglide/messages";

export const Projects = () => {
    return (
        <SectionContainer sectionName="projects">
            <SectionHeading
                text={m.projects_heading()}
                kicker="// projects-showcase"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {PROJECTS.map((project) => (
                    <ProjectCard
                        key={project.title}
                        {...project}
                    />
                ))}
            </div>
        </SectionContainer>
    );
};
