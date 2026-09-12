import { CertificateIcon, GraduationCapIcon } from "@phosphor-icons/react";
import { Fragment } from "react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { CourseItem } from "#/components/sections/courses/CourseItem";
import { GroupLabel } from "#/components/sections/courses/GroupLabel";
import { Card, CardContent } from "#/components/shadcn/card";
import { ItemGroup, ItemSeparator } from "#/components/shadcn/item";
import type { Course } from "#/content";
import { CERTIFICATES, COURSES } from "#/content";
import { m } from "#/paraglide/messages";

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
