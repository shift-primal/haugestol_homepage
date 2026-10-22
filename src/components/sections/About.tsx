import { CaretRightIcon } from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import {
    CERTIFICATES,
    COURSES,
    type CvSkillsSection,
    type CvTextSection,
    formatCvPeriod,
    getCv,
    getCvEntries,
} from "#/content";
import { m } from "#/paraglide/messages";

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {children}
    </h3>
);

// Bio, skills and experience all come from the CV data, so the page and
// the PDF say the same thing. Courses sit behind a disclosure: useful for
// the curious, not something to lead with.
export const About = () => {
    const cv = getCv();
    const bio = cv.main.find(
        (section): section is CvTextSection => section.type === "text"
    );
    const skills = cv.sidebar.find(
        (section): section is CvSkillsSection => section.type === "skills"
    );
    const experienceTitle = cv.main.find(
        (section) => section.type === "entries" && section.id === "experience"
    )?.title;
    const experience = getCvEntries("experience");
    const courses = [
        ...COURSES,
        ...CERTIFICATES,
    ];

    return (
        <SectionContainer sectionName="about">
            <SectionHeading text={m.about_heading()} />
            <div className="grid gap-12 pointer-events-auto lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-8 lg:col-span-5">
                    {bio && (
                        <p className="max-w-prose text-lg leading-relaxed text-pretty text-foreground/85">
                            {bio.body}
                        </p>
                    )}

                    <div>
                        <SubHeading>{experienceTitle}</SubHeading>
                        <ul className="flex flex-col gap-4">
                            {experience.map((job) => (
                                <li key={job.title}>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <span className="font-semibold">
                                            {job.title}
                                        </span>
                                        {job.period && (
                                            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                                                {formatCvPeriod(job.period)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {job.subtitle}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-10 lg:col-span-7">
                    {skills && (
                        <div>
                            <SubHeading>{skills.title}</SubHeading>
                            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                                {skills.groups.map((group) => (
                                    <div key={group.label}>
                                        <dt className="text-sm font-semibold">
                                            {group.label}
                                        </dt>
                                        <dd className="text-sm text-pretty text-muted-foreground">
                                            {group.items.join(" · ")}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}

                    <details className="group border-t border-border pt-5">
                        <summary className="flex w-fit cursor-pointer list-none items-center gap-2 text-sm font-semibold outline-none focus-ring [&::-webkit-details-marker]:hidden">
                            <CaretRightIcon
                                aria-hidden
                                className="size-3.5 transition-transform duration-base group-open:rotate-90"
                            />
                            {m.about_courses_toggle({
                                count: courses.length,
                            })}
                        </summary>
                        <ul className="mt-4 grid gap-x-10 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                            {courses.map((course) => (
                                <li
                                    key={`${course.provider}-${course.title}`}
                                    className="flex items-baseline justify-between gap-4"
                                >
                                    <span>
                                        {course.provider} · {course.title}
                                    </span>
                                    <span className="shrink-0 text-xs tabular-nums">
                                        {course.year}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>
            </div>
        </SectionContainer>
    );
};
