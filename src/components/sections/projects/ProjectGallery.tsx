import { LockSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { Img } from "vite-imagetools";
import { ProjectImage } from "#/components/sections/projects/ProjectImage";
import { ProjectLightbox } from "#/components/sections/projects/ProjectLightbox";
import { ProjectVideo } from "#/components/sections/projects/ProjectVideo";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "#/components/shadcn/carousel";
import type { Recording } from "#/content";
import { m } from "#/paraglide/messages";

const GalleryPlaceholder = ({
    title,
    isPrivate,
}: {
    title: string;
    isPrivate?: boolean;
}) => (
    <div className="flex aspect-video w-full flex-col justify-between bg-foreground p-5 text-background sm:p-7 dark:bg-secondary dark:text-foreground">
        <span className="flex items-end gap-[0.12em] text-3xl leading-none font-extrabold tracking-tight sm:text-4xl">
            {title}
            <span
                aria-hidden
                className="mb-[0.04em] inline-block h-[0.72em] w-[0.42em] shrink-0 bg-primary"
            />
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-background/80 dark:text-foreground/75">
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
    recording,
    isPrivate,
}: {
    title: string;
    images: Record<string, Img>;
    recording?: Recording;
    isPrivate?: boolean;
}) => {
    const imageEntries = Object.entries(images);
    const slideCount = imageEntries.length + (recording ? 1 : 0);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    if (slideCount === 0) {
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
                    {recording && (
                        <CarouselItem>
                            <button
                                type="button"
                                className="block w-full cursor-zoom-in outline-none focus-ring"
                                onClick={() => openLightbox(0)}
                            >
                                <ProjectVideo
                                    recording={recording}
                                    title={title}
                                    className="border"
                                />
                            </button>
                        </CarouselItem>
                    )}
                    {imageEntries.map(([id, img], index) => (
                        <CarouselItem key={id}>
                            <button
                                type="button"
                                className="block w-full cursor-zoom-in outline-none focus-ring"
                                onClick={() =>
                                    openLightbox(index + (recording ? 1 : 0))
                                }
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
                {slideCount > 1 && (
                    <>
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
                recording={recording}
                open={lightboxOpen}
                onOpenChange={setLightboxOpen}
                startIndex={startIndex}
            />
        </>
    );
};
