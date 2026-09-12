import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { SkillCategoryCard } from "#/components/sections/skills/SkillCategoryCard";
import { SKILLS } from "#/content";
import { m } from "#/paraglide/messages";

export const Skills = () => {
    return (
        <SectionContainer sectionName="skills">
            <SectionHeading
                text={m.skills_heading()}
                kicker="// my-skills-and-tools"
            />
            <div className="grid grid-cols-1 gap-6 sm:block sm:columns-2 sm:gap-8">
                {SKILLS.skills.map((sg) => (
                    <div
                        key={sg.category}
                        className="sm:mb-8 sm:break-inside-avoid"
                    >
                        <SkillCategoryCard group={sg} />
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
};
