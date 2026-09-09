import { Card, CardContent, CardTitle } from "#/components/shadcn/card";
import {
    Item,
    ItemContent,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "#/components/shadcn/item";
import type { SkillGroup } from "#/lib/content";

const SkillCategory = ({ group }: { group: SkillGroup }) => {
    const GroupIcon = group.icon;
    return (
        <Card>
            <CardTitle className="flex items-center px-4 gap-2">
                <GroupIcon />
                {group.category.toUpperCase()}
            </CardTitle>
            <CardContent>
                <ItemGroup className="grid grid-cols-2">
                    {group.skills.map((skill) => {
                        const SkillIcon = skill.icon;
                        return (
                            <Item
                                key={skill.title}
                                className="border border-border flex flex-col"
                            >
                                <ItemMedia>
                                    <SkillIcon />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="font-bold text-sm">
                                        {skill.title}
                                    </ItemTitle>
                                </ItemContent>
                            </Item>
                        );
                    })}
                </ItemGroup>
            </CardContent>
        </Card>
    );
};

export const Skills = ({ skills }: { skills: SkillGroup[] }) => {
    return (
        <div className="grid grid-cols-2 gap-8">
            {skills.map((sg) => (
                <SkillCategory
                    key={sg.category}
                    group={sg}
                />
            ))}
        </div>
    );
};
