import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ProjectCard } from "#/components/sections/projects/ProjectCard";
import { PROJECTS } from "#/lib/content";

export const Projects = () => {
	return (
		<SectionContainer sectionName="projects">
			<SectionHeading text="Prosjekter" kicker="// projects" />
			<div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 md:gap-8 xl:grid-cols-3 ">
				{PROJECTS.map((project) => (
					<ProjectCard key={project.title} {...project} />
				))}
			</div>
		</SectionContainer>
	);
};
