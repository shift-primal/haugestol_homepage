import {
    CertificateIcon,
    GraduationCapIcon,
    type Icon,
} from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { CourseItem } from "#/components/sections/courses/CourseItem";
import { Card, CardContent } from "#/components/shadcn/card";
import { CERTIFICATES, COURSES } from "#/content";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";

const GroupLabel = ({
    text,
    icon: Icon,
    className,
}: {
    text: string;
    icon?: Icon;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "border-b border-border bg-foreground/5 px-4 py-2 font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase flex items-center gap-2",
                className
            )}
        >
            {Icon && <Icon />}
            {text}
        </div>
    );
};

export const Courses = () => {
    return (
        <SectionContainer sectionName="courses">
            <SectionHeading
                text={m.courses_heading()}
                kicker="// courses-and-certificates"
            />
            <Card className="bg-transparent backdrop-blur-md py-0">
                <CardContent className="flex flex-col px-0">
                    <GroupLabel
                        text={m.courses_group_courses()}
                        icon={GraduationCapIcon}
                    />
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
                        icon={CertificateIcon}
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
