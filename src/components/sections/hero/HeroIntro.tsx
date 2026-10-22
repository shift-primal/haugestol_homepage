import { SITE } from "#/content";
import { cn } from "#/lib/shadcn.utils";

const NAME_WITH_LINE_BREAK = SITE.name.replace(" ", "\n");

const HEADING_CLASSNAME =
    "whitespace-pre-line text-6xl leading-[1.02] font-extrabold tracking-[-0.035em] md:text-7xl lg:whitespace-nowrap xl:text-8xl";

export const HeroIntro = () => {
    return (
        <div>
            <div className="relative min-w-fit pointer-events-auto">
                <h1 className={cn("inline-block", HEADING_CLASSNAME)}>
                    {NAME_WITH_LINE_BREAK}
                </h1>
            </div>
        </div>
    );
};
