import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ABOUT } from "#/lib/content";
import { m } from "#/paraglide/messages";

export const About = () => {
	return (
		<SectionContainer sectionName="about">
			<div className="flex flex-col gap-8">
				<SectionHeading text={m.about_heading()} kicker="// about-me" />
				<p className="max-w-xl text-muted-foreground leading-relaxed pointer-events-auto">
					{ABOUT.bio}
				</p>
			</div>
		</SectionContainer>
	);
};
