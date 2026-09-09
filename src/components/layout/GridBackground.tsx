import { InteractiveGridPattern } from "#/components/shadcn/interactive-grid-pattern";

export const GridBackground = () => {
    return (
        <div className="absolute inset-0 overflow-clip pointer-events-none mask-intersect mask-[linear-gradient(to_right,transparent,black_40%,black_60%,transparent),linear-gradient(to_bottom,transparent,black_40%,black_60%,transparent)]">
            <div className="relative flex h-full skew-y-12">
                <InteractiveGridPattern />
            </div>
        </div>
    );
};
