import { Badge } from "#/components/shadcn/badge";
import type { Skill } from "#/content";

export const SkillBadge = ({ skill }: { skill: Skill }) => {
    const SkillIcon = skill.icon;

    return (
        <Badge
            key={skill.title}
            variant="outline"
            className="gap-1.5 hover:scale-105 transition-transform duration-slow select-none"
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
};
