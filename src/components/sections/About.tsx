import { SectionContainer } from "#/components/layout/SectionContainer";
import { KineticText } from "#/components/shadcn/kinetic-text";

export const About = () => {
	return (
		<SectionContainer sectionName="about">
			<div className="flex flex-col gap-6 px-6 pt-12 sm:px-10 sm:pt-16 lg:px-0 lg:pt-0">
				<KineticText
					as="h2"
					text="About"
					className="text-3xl sm:text-4xl lg:text-5xl"
				/>
				<p className="max-w-xl text-muted-foreground">
					{/* TODO: replace with real bio */}
					Short bio goes here — background, what you focus on, what you're
					looking for.
				</p>
			</div>
		</SectionContainer>
	);
};
