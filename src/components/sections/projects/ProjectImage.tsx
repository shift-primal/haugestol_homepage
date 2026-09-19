import type { Img } from "vite-imagetools";
import { cn } from "#/lib/shadcn.utils";

export const ProjectImage = ({
    img,
    title,
    className,
}: {
    img: Img;
    title: string;
    className?: string;
}) => {
    return (
        <div className={cn("overflow-clip", className)}>
            <img
                src={img.src}
                srcSet={img.srcset}
                sizes="90vw"
                width={img.w}
                height={img.h}
                alt={`${title} preview`}
                loading="lazy"
                className="relative z-20 aspect-video object-fill scale-101"
            />
        </div>
    );
};
