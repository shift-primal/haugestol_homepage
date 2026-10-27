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

export const getCv = (): Cv => (getLocale() === "en" ? cvEn : cvNo);

export const getCvEntries = (id: CvEntriesSection["id"]) =>
    getCv().main.find(
        (section): section is CvEntriesSection =>
            section.type === "entries" && section.id === id
    )?.items ?? [];

export const formatCvPeriod = ({ start, end }: CvPeriod) =>
    `${start} – ${end ?? getCv().present}`;

export const getCvLocation = () =>
    getCv()
        .sidebar.find(
            (section): section is CvContactSection => section.type === "contact"
        )
        ?.items.find((item) => item.icon === "map-pin")?.label;
