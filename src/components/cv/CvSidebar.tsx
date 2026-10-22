import { CvIcon } from "#/components/cv/CvIcon";
import { CvSideSection } from "#/components/cv/CvSection";
import {
    type CvContactSection,
    type CvEducationSection,
    type CvSidebarSection,
    type CvSkillsSection,
    formatCvPeriod,
} from "#/content";
import { cn } from "#/lib/shadcn.utils";

const Contact = ({ title, items }: CvContactSection) => (
    <CvSideSection title={title}>
        <ul className="flex flex-col gap-1">
            {items.map((item) => {
                const content = (
                    <>
                        <CvIcon
                            name={item.icon}
                            className="size-[3.6mm] shrink-0"
                        />
                        <span>{item.label}</span>
                    </>
                );
                return (
                    <li key={item.label}>
                        {item.href ? (
                            <a
                                href={item.href}
                                className="flex items-center gap-2"
                            >
                                {content}
                            </a>
                        ) : (
                            <span className="flex items-center gap-2">
                                {content}
                            </span>
                        )}
                    </li>
                );
            })}
        </ul>
    </CvSideSection>
);

const Education = ({ title, items }: CvEducationSection) => (
    <CvSideSection title={title}>
        <ul className="flex flex-col gap-2.5">
            {items.map((item) => (
                <li key={item.title}>
                    <h3 className="flex items-center gap-2 font-semibold">
                        <CvIcon
                            name={item.icon}
                            className="size-[3.2mm] shrink-0"
                        />
                        {item.title}
                    </h3>
                    <p>{item.description}</p>
                    {item.period && (
                        <p className="text-cv-muted">
                            {formatCvPeriod(item.period)}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    </CvSideSection>
);

const Skills = ({ title, groups }: CvSkillsSection) => (
    <CvSideSection title={title}>
        <dl className="flex flex-col gap-2.5">
            {groups.map((group) => (
                <div key={group.label}>
                    <dt className="flex items-center gap-2 font-semibold">
                        <CvIcon
                            name={group.icon}
                            className="size-[3.2mm] shrink-0"
                        />
                        <span>{group.label}</span>
                    </dt>
                    <dd className="overflow-hidden">
                        <ul className="-ml-2.5 flex flex-wrap">
                            {group.items.map((skill) => (
                                <li
                                    key={skill}
                                    className="whitespace-nowrap before:inline-block before:w-2.5 before:text-center before:content-['·']"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </dd>
                </div>
            ))}
        </dl>
    </CvSideSection>
);

const renderSection = (section: CvSidebarSection) => {
    switch (section.type) {
        case "contact":
            return (
                <Contact
                    key={section.title}
                    {...section}
                />
            );
        case "education":
            return (
                <Education
                    key={section.title}
                    {...section}
                />
            );
        case "skills":
            return (
                <Skills
                    key={section.title}
                    {...section}
                />
            );
    }
};

export const CvSidebar = ({
    photo,
    sections,
}: {
    photo?: string;
    sections: CvSidebarSection[];
}) => (
    <div
        className={cn(
            "col-start-1 flex flex-col gap-5 text-cv-body leading-[1.4]",
            // with a photo the column starts up in the header band; without
            // one it starts below it, level with the main column
            photo ? "row-[1/span_2]" : "row-start-2"
        )}
    >
        {photo && (
            <img
                src={photo}
                alt=""
                className="block h-65 w-full border-[1mm] border-cv-accent object-cover object-center"
            />
        )}
        {sections.map(renderSection)}
    </div>
);
