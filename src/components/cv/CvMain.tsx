import { Fragment } from "react";
import { CvMainSection } from "#/components/cv/CvSection";
import {
    type CvEntry,
    formatCvPeriod,
    type CvMainSection as Section,
} from "#/content";

const SEPARATOR = " · ";

const Entry = ({
    title,
    subtitle,
    description,
    period,
    status,
    links,
    tech,
}: CvEntry) => (
    <article>
        <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-cv-title leading-[1.35] font-semibold">
                {title}
            </h3>
            {links?.length ? (
                <span className="shrink-0 whitespace-nowrap">
                    {links.map((link, index) => (
                        <Fragment key={link.href}>
                            {index > 0 && (
                                <span className="text-cv-muted">
                                    {SEPARATOR}
                                </span>
                            )}
                            <a
                                className="font-medium text-cv-navy"
                                href={link.href}
                            >
                                {link.label}
                            </a>
                        </Fragment>
                    ))}
                </span>
            ) : period ? (
                <span className="shrink-0 whitespace-nowrap text-cv-muted">
                    {formatCvPeriod(period)}
                </span>
            ) : (
                status && (
                    <span className="shrink-0 whitespace-nowrap text-cv-muted">
                        {status}
                    </span>
                )
            )}
        </div>
        <p className="font-medium text-pretty text-cv-navy">{subtitle}</p>
        <p className="text-pretty">{description}</p>
        {tech && (
            <p className="mt-1 text-cv-small text-pretty text-cv-muted">
                {tech.join(SEPARATOR)}
            </p>
        )}
    </article>
);

const renderSection = (section: Section) => {
    switch (section.type) {
        case "text":
            return (
                <CvMainSection
                    key={section.title}
                    title={section.title}
                >
                    <p className="text-pretty">{section.body}</p>
                </CvMainSection>
            );
        case "entries":
            return (
                <CvMainSection
                    key={section.id}
                    title={section.title}
                >
                    <div className="flex flex-col gap-3">
                        {section.items.map((item) => (
                            <Entry
                                key={item.title}
                                {...item}
                            />
                        ))}
                    </div>
                </CvMainSection>
            );
    }
};

export const CvMain = ({ sections }: { sections: Section[] }) => (
    <div className="col-start-2 row-start-2 flex flex-col gap-5 text-cv-body leading-[1.4]">
        {sections.map(renderSection)}
    </div>
);
