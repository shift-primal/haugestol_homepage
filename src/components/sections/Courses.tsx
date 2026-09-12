import {
    CertificateIcon,
    GraduationCapIcon,
    type Icon,
} from "@phosphor-icons/react";
import { Fragment } from "react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { CourseItem } from "#/components/sections/courses/CourseItem";
import { Card, CardContent } from "#/components/shadcn/card";
import { ItemGroup, ItemSeparator } from "#/components/shadcn/item";
import type { Course } from "#/content";
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

const CourseGroup = ({ items }: { items: Course[] }) => (
    <ItemGroup className="gap-0">
        {items.map((item, index) => (
            <Fragment key={item.title}>
                {index !== 0 && <ItemSeparator className="my-0" />}
                <CourseItem course={item} />
            </Fragment>
        ))}
    </ItemGroup>
);

export const Courses = () => {
    return (
        <SectionContainer sectionName="courses">
            <SectionHeading
                text={m.courses_heading()}
                kicker="// courses-and-certificates"
            />
            <Card className="bg-glass py-0">
                <CardContent className="px-0">
                    <GroupLabel
                        text={m.courses_group_courses()}
                        icon={GraduationCapIcon}
                    />
                    <CourseGroup items={COURSES} />
                    <GroupLabel
                        text={m.courses_group_certificates()}
                        icon={CertificateIcon}
                        className="border-t"
                    />
                    <CourseGroup items={CERTIFICATES} />
                </CardContent>
            </Card>
        </SectionContainer>
    );
};
