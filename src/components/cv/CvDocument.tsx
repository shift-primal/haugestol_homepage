import photo from "#/assets/cv/photo.jpg?w=640&format=jpg";
import { CvMain } from "#/components/cv/CvMain";
import { CvSidebar } from "#/components/cv/CvSidebar";
import type { Cv } from "#/content";

const PAGE_VARS = {
    "--page-top": "10mm",
    "--page-side": "13.6mm",
    "--header-height": "51mm",
    "--header-rule": "2.6mm",
    "--sidebar-width": "54.5mm",
    "--name-height":
        "calc(var(--header-height) + var(--header-rule) - var(--page-top))",
} as React.CSSProperties;

// One A4 sheet. Spacing utilities inside run on a 1mm unit (--spacing), so
// the layout reads in print measurements.
export const CvDocument = ({ cv }: { cv: Cv }) => (
    <article
        style={PAGE_VARS}
        className="relative h-[297mm] w-[210mm] overflow-hidden bg-cv-paper font-cv-body leading-normal text-cv-ink [--spacing:1mm] [print-color-adjust:exact] selection:bg-cv-accent selection:text-cv-navy [&_a]:underline-offset-[0.2em] [&_a:focus-visible]:outline-solid [&_a:focus-visible]:outline-[0.5mm] [&_a:focus-visible]:outline-offset-[0.6mm] [&_a:focus-visible]:outline-cv-navy [&_a:hover]:underline"
    >
        <div className="absolute inset-x-0 top-0 h-(--header-height) border-b-[1.4mm] border-cv-accent bg-cv-navy shadow-[0_var(--header-rule)_0_var(--color-cv-navy)]" />

        <div className="relative grid grid-cols-[var(--sidebar-width)_1fr] grid-rows-[auto_1fr] gap-x-12 gap-y-5 px-(--page-side) pt-(--page-top)">
            <header className="col-start-2 row-start-1 h-(--name-height) text-white">
                <h1 className="font-cv-name text-cv-name leading-[1.12] tracking-[0.01em] uppercase [text-box:trim-both_cap_alphabetic]">
                    <span className="block font-normal">{cv.name.first}</span>
                    <span className="block font-bold">{cv.name.last}</span>
                </h1>
                <p className="mt-5.5 text-cv-role font-light tracking-[0.08em] [text-box:trim-both_cap_alphabetic]">
                    {cv.role}
                </p>
            </header>
            <CvSidebar
                photo={photo}
                sections={cv.sidebar}
            />
            <CvMain sections={cv.main} />
        </div>
    </article>
);
