import { SectionContainer } from "#/components/layout/SectionContainer";
import { ProjectCard } from "#/components/sections/projects/ProjectCard";
import { KineticText } from "#/components/shadcn/kinetic-text";
import { PROJECTS } from "#/lib/config";

export const Projects = () => {
	return (
		<SectionContainer sectionName="projects">
			<div className="px-6 pt-12 sm:px-10 sm:pt-16  lg:px-0 lg:pt-0">
				<KineticText
					as="h2"
					text="Projects"
					className="text-3xl sm:text-4xl lg:text-5xl"
				/>
			</div>
			<div className="flex flex-col gap-6 items-center justify-center py-16">
				<div className="flex flex-col lg:flex-row gap-8 w-full items-center">
					{PROJECTS.map((project) => (
						<ProjectCard key={project.title} {...project} />
					))}
				</div>
			</div>
		</SectionContainer>
	);
};
