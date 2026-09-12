import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { getAbout } from "#/content";
import { m } from "#/paraglide/messages";

export const About = () => {
    return (
        <SectionContainer sectionName="about">
            <SectionHeading
                text={m.about_heading()}
                kicker="// about-me"
            />
            <div className="flex flex-col gap-8">
                <p className="max-w-3xl text-muted-foreground leading-relaxed pointer-events-auto">
                    {getAbout().bio}
                </p>
            </div>
        </SectionContainer>
    );
};
