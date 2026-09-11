import { GraduationCapIcon } from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { CourseItem } from "#/components/sections/courses/CourseItem";
import { Card, CardContent } from "#/components/shadcn/card";
import { CERTIFICATES, COURSES } from "#/content";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";

const GroupLabel = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => (
    <div
        className={cn(
            "border-b border-border bg-foreground/5 px-4 py-2 font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase",
            className
        )}
    >
        {text}
    </div>
);

export const Courses = () => {
    return (
        <SectionContainer sectionName="courses">
            <SectionHeading
                text={m.courses_heading()}
                kicker="// courses-and-certificates"
            />
            <Card className="bg-transparent backdrop-blur-md py-1">
                <div className="flex items-center gap-2 border-border px-4 pt-4 font-mono text-xs tracking-wide text-muted-foreground justify">
                    <GraduationCapIcon className="size-4" />
                    {m.courses_note()}
                </div>
                <CardContent className="flex flex-col px-0">
                    <GroupLabel text={m.courses_group_courses()} />
                    {COURSES.map((course, index) => (
                        <CourseItem
                            key={course.title}
                            course={course}
                            index={index}
                            totalCourses={COURSES.length - 1}
                        />
                    ))}
                    <GroupLabel
                        text={m.courses_group_certificates()}
                        className="border-t"
                    />
                    {CERTIFICATES.map((certificate, index) => (
                        <CourseItem
                            key={certificate.title}
                            course={certificate}
                            index={index}
                            totalCourses={CERTIFICATES.length - 1}
                        />
                    ))}
                </CardContent>
            </Card>
        </SectionContainer>
    );
};
