import { SectionContainer } from "#/components/layout/SectionContainer";
import { KineticText } from "#/components/shadcn/kinetic-text";
import { BIO } from "#/lib/config";

export const About = () => {
	return (
		<SectionContainer sectionName="about">
			<div className="flex flex-col gap-6">
				<KineticText
					as="h2"
					text="About"
					className="text-3xl sm:text-4xl lg:text-5xl"
				/>
				<p className="max-w-xl text-muted-foreground pointer-events-auto">
					{BIO}
				</p>
			</div>
		</SectionContainer>
	);
};
