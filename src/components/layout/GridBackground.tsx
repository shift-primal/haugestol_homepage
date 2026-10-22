import { InteractiveGridPattern } from "#/components/shadcn/interactive-grid-pattern";

export const GridBackground = () => {
    return (
        // only behind the hero: it fades out before the projects so body
        // text never sits on grid lines
        <div className="absolute inset-x-0 top-0 h-[90svh] max-h-224 overflow-clip pointer-events-none mask-intersect mask-[linear-gradient(to_right,transparent,black_40%,black_60%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_45%,transparent)]">
            <div className="relative flex h-full skew-y-12">
                <InteractiveGridPattern />
            </div>
        </div>
    );
};
