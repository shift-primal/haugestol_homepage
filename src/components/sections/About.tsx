import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { Bio } from "#/components/sections/about/Bio";
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
                <Bio text={getAbout().bio} />
            </div>
        </SectionContainer>
    );
};
