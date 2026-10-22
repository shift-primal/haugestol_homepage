import { LockSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { Img } from "vite-imagetools";
import { ProjectImage } from "#/components/sections/projects/ProjectImage";
import { ProjectLightbox } from "#/components/sections/projects/ProjectLightbox";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "#/components/shadcn/carousel";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { m } from "#/paraglide/messages";

// Stand-in until real screenshots exist (private projects for now). Says
// what it is rather than faking a screenshot.
const GalleryPlaceholder = ({ isPrivate }: { isPrivate?: boolean }) => (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 border border-dashed border-border bg-muted text-muted-foreground">
        {isPrivate && (
            <LockSimpleIcon
                aria-hidden
                className="size-5"
            />
        )}
        <span className="text-xs">{m.project_screenshots_coming()}</span>
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
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const imageEntries = Object.entries(images);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    if (imageEntries.length === 0) {
        return <GalleryPlaceholder isPrivate={isPrivate} />;
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
                            {isDesktop ? (
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
                            ) : (
                                <ProjectImage
                                    img={img}
                                    title={title}
                                    className="border"
                                />
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {imageEntries.length > 1 && (
                    <>
                        <CarouselPrevious
                            variant="secondary"
                            className="left-3 opacity-65 absolute"
                        />
                        <CarouselNext
                            variant="secondary"
                            className="right-3 opacity-65 absolute"
                        />
                    </>
                )}
            </Carousel>

            {isDesktop && (
                <ProjectLightbox
                    title={title}
                    imageEntries={imageEntries}
                    open={lightboxOpen}
                    onOpenChange={setLightboxOpen}
                    startIndex={startIndex}
                />
            )}
        </>
    );
};
