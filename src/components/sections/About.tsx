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
            {/* history on the left (bio, experience, courses), capability on
                the right (skills). Skills comes before courses in the DOM, so
                phones and screen readers still reach the courses last */}
            <div className="grid gap-12 pointer-events-auto lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr] lg:gap-x-16 lg:gap-y-10">
                {bio && (
                    <p className="max-w-prose text-lg leading-relaxed text-pretty text-foreground/85 lg:col-span-5">
                        {bio.body}
                    </p>
                )}

                <div className="lg:col-span-5 lg:col-start-1">
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

                {skills && (
                    <div className="lg:col-span-7 lg:col-start-6 lg:row-span-3 lg:row-start-1">
                        <SubHeading>{skills.title}</SubHeading>
                        {/* a spec sheet: labels share one edge and every row
                            is as tall as its own content */}
                        <dl className="border-b border-border">
                            {skills.groups.map((group) => (
                                <div
                                    key={group.label}
                                    className="grid gap-1 border-t border-border py-3 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-x-6"
                                >
                                    <dt className="text-sm font-semibold">
                                        {group.label}
                                    </dt>
                                    <dd className="text-sm text-pretty text-muted-foreground">
                                        {/* the dot stays with the item before
                                            it, so no line starts with one */}
                                        {group.items.join("\u00a0· ")}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                <details className="disclosure group self-start border-border lg:col-span-5 lg:border-t lg:pt-5 lg:col-start-1 lg:row-start-3">
                    <summary className="flex w-fit cursor-pointer list-none items-center gap-2 text-sm font-semibold outline-none focus-ring [&::-webkit-details-marker]:hidden">
                        <CaretRightIcon
                            aria-hidden
                            className="size-3.5 transition-transform duration-base group-open:rotate-90 motion-reduce:transition-none"
                        />
                        {m.about_courses_toggle({
                            count: courses.length,
                        })}
                    </summary>
                    <ul className="flex flex-col gap-2 pt-4 text-sm">
                        {courses.map((course, index) => (
                            <li
                                key={`${course.provider}-${course.title}`}
                                className="disclosure-row flex items-baseline justify-between gap-4"
                                style={
                                    {
                                        "--row": index,
                                    } as React.CSSProperties
                                }
                            >
                                <span className="text-pretty text-foreground/85">
                                    {course.title}
                                </span>
                                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                                    {course.provider} · {course.year}
                                </span>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
        </SectionContainer>
    );
};
