import { LockSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { Img } from "vite-imagetools";
import { ProjectImage } from "#/components/sections/projects/ProjectImage";
import { ProjectLightbox } from "#/components/sections/projects/ProjectLightbox";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "#/components/shadcn/carousel";
import { m } from "#/paraglide/messages";

// Stand-in until real screenshots exist: a title card that says what it is
// rather than faking a screenshot. Swapped out automatically once the
// project has images (see SITE_EXTRAS in content/projects.ts).
const GalleryPlaceholder = ({
    title,
    isPrivate,
}: {
    title: string;
    isPrivate?: boolean;
}) => (
    <div className="flex aspect-video w-full flex-col justify-between border border-border bg-muted p-5 sm:p-6">
        <span className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-foreground/75">
            {isPrivate && (
                <LockSimpleIcon
                    aria-hidden
                    className="size-3.5"
                />
            )}
            {m.project_screenshots_coming()}
        </span>
    </div>
);

export const ProjectGallery = ({
    title,
    images,
    isPrivate,
}: {
    title: string;
    images: Record<string, Img>;
    isPrivate?: boolean;
}) => {
    const imageEntries = Object.entries(images);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    if (imageEntries.length === 0) {
        return (
            <GalleryPlaceholder
                title={title}
                isPrivate={isPrivate}
            />
        );
    }

    const openLightbox = (index: number) => {
        setStartIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <Carousel
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {imageEntries.map(([id, img], index) => (
                        <CarouselItem key={id}>
                            {/* tap or click for full screen, on every size */}
                            <button
                                type="button"
                                className="block w-full cursor-zoom-in outline-none focus-ring"
                                onClick={() => openLightbox(index)}
                            >
                                <ProjectImage
                                    img={img}
                                    title={title}
                                    className="border"
                                />
                            </button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {imageEntries.length > 1 && (
                    <>
                        {/* arrows over the image fight with swiping, so
                            phones get the dots below instead */}
                        <CarouselPrevious
                            variant="secondary"
                            className="absolute top-[calc(50%-1.25rem)] left-3 my-0 hidden opacity-65 md:inline-flex"
                        />
                        <CarouselNext
                            variant="secondary"
                            className="absolute top-[calc(50%-1.25rem)] right-3 my-0 hidden opacity-65 md:inline-flex"
                        />
                    </>
                )}
                <CarouselDots className="mt-2" />
            </Carousel>

            <ProjectLightbox
                title={title}
                imageEntries={imageEntries}
                open={lightboxOpen}
                onOpenChange={setLightboxOpen}
                startIndex={startIndex}
            />
        </>
    );
};
