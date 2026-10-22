import { cvEn } from "#/content/cv/en";
import { cvNo } from "#/content/cv/no";
import type {
    Cv,
    CvContactSection,
    CvEntriesSection,
    CvPeriod,
} from "#/content/cv/types";
import { getLocale } from "#/paraglide/runtime";

export type * from "#/content/cv/types";

// a function rather than a constant so it follows the active locale
export const getCv = (): Cv => (getLocale() === "en" ? cvEn : cvNo);

export const getCvEntries = (id: CvEntriesSection["id"]) =>
    getCv().main.find(
        (section): section is CvEntriesSection =>
            section.type === "entries" && section.id === id
    )?.items ?? [];

export const formatCvPeriod = ({ start, end }: CvPeriod) =>
    `${start} – ${end ?? getCv().present}`;

// location is written once, in the CV's contact list
export const getCvLocation = () =>
    getCv()
        .sidebar.find(
            (section): section is CvContactSection => section.type === "contact"
        )
        ?.items.find((item) => item.icon === "map-pin")?.label;
