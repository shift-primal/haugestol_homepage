import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "#/components/shadcn/item";
import type { Course } from "#/content";

export const CourseItem = ({ course }: { course: Course }) => {
    const ProviderIcon = course.icon;
    return (
        <Item className="rounded-none px-4 py-3 hover:bg-muted">
            <ItemMedia variant="icon-circle">
                <ProviderIcon />
            </ItemMedia>
            <ItemContent className="min-w-0">
                <ItemTitle className="font-mono text-foreground/90">
                    {course.provider} | {course.title}
                </ItemTitle>
            </ItemContent>
            <ItemActions className="font-mono text-muted-foreground">
                {course.year}
            </ItemActions>
        </Item>
    );
};
