import { SkillBadge } from "#/components/sections/skills/SkillBadge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "#/components/shadcn/card";
import type { SkillGroup } from "#/content";

export const SkillCategory = ({ group }: { group: SkillGroup }) => {
    const GroupIcon = group.icon;
    return (
        <Card className="bg-transparent backdrop-blur-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground tracking-widest">
                    <GroupIcon className="size-4" />
                    {group.category.toUpperCase()}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                    <SkillBadge
                        key={skill.title}
                        skill={skill}
                    />
                ))}
            </CardContent>
        </Card>
    );
};
