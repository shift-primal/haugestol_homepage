import type { Course } from "#/content";
import { cn } from "#/lib/shadcn.utils";

export const CourseItem = ({
    course,
    index,
    totalCourses,
}: {
    course: Course;
    index: number;
    totalCourses: number;
}) => {
    const ProviderIcon = course.icon;
    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-3",
                index !== totalCourses && "border-b border-border"
            )}
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground/70">
                <ProviderIcon className="size-4" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-mono text-sm text-foreground/90">
                    {course.provider} | {course.title} -{" "}
                    <span className="text-muted-foreground">{course.year}</span>
                </span>
            </span>
        </div>
    );
};
