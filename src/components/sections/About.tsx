import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { BIO } from "#/lib/config";

export const About = () => {
	return (
		<SectionContainer sectionName="about">
			<div className="flex flex-col gap-8">
				<SectionHeading text="Om meg" />
				<p className="max-w-xl text-muted-foreground leading-relaxed pointer-events-auto">
					{BIO}
				</p>
			</div>
		</SectionContainer>
	);
};
