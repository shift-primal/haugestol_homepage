import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { Badge } from "#/components/shadcn/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "#/components/shadcn/card";
import { SKILLS, type SkillGroup } from "#/lib/content";
import { m } from "#/paraglide/messages";

const SkillCategory = ({ group }: { group: SkillGroup }) => {
    const GroupIcon = group.icon;
    return (
        <Card className="bg-transparent backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground tracking-widest">
                    <GroupIcon className="size-4" />
                    {group.category.toUpperCase()}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                        <Badge
                            key={skill.title}
                            variant="outline"
                            className="gap-1.5 hover:scale-105 transition-transform duration-300 select-none hover:border-foreground/25"
                        >
                            <SkillIcon
                                className="size-3"
                                style={
                                    skill.color
                                        ? {
                                              color: skill.color,
                                          }
                                        : undefined
                                }
                            />
                            {skill.title}
                        </Badge>
                    );
                })}
            </CardContent>
        </Card>
    );
};

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
                        <SkillCategory group={sg} />
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
};
