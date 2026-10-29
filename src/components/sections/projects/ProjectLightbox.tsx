import { useState } from "react";
import type { Img } from "vite-imagetools";
import { ProjectImage } from "#/components/sections/projects/ProjectImage";
import { ProjectVideo } from "#/components/sections/projects/ProjectVideo";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselCounter,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "#/components/shadcn/carousel";
import { Dialog, DialogContent, DialogTitle } from "#/components/shadcn/dialog";
import type { Recording } from "#/content";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { m } from "#/paraglide/messages";

export const ProjectLightbox = ({
    title,
    imageEntries,
    recording,
    open,
    onOpenChange,
    startIndex,
}: {
    title: string;
    imageEntries: [
        string,
        Img,
    ][];
    recording?: Recording;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    startIndex: number;
}) => {
    const [api, setApi] = useState<CarouselApi>();
    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="max-w-full border-none bg-transparent px-0 pt-14 ring-0 sm:max-w-7xl sm:px-4"
                overlayClassName="bg-black/85"
                closeButtonClassName="top-1 right-1 size-11 text-white hover:bg-white/10 hover:text-white [&_svg:not([class*='size-'])]:size-5"
                onKeyDown={(event) => {
                    if (event.defaultPrevented) return;
                    if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        api?.scrollPrev(reducedMotion);
                    } else if (event.key === "ArrowRight") {
                        event.preventDefault();
                        api?.scrollNext(reducedMotion);
                    }
                }}
            >
                <DialogTitle className="sr-only">
                    {m.project_lightbox_title({
                        title,
                    })}
                </DialogTitle>
                <Carousel
                    setApi={setApi}
                    opts={{
                        startIndex,
                        loop: true,
                    }}
                    className="flex w-full cursor-default flex-col gap-4"
                >
                    <div className="flex items-center gap-6">
                        <CarouselPrevious
                            variant="secondary"
                            className="hidden shrink-0 md:inline-flex"
                        />
                        <div className="min-w-0 flex-1">
                            <CarouselContent>
                                {recording && (
                                    <CarouselItem className="flex items-center justify-center">
                                        <ProjectVideo
                                            recording={recording}
                                            title={title}
                                            controls
                                            className="max-h-[80dvh] max-w-full"
                                        />
                                    </CarouselItem>
                                )}
                                {imageEntries.map(([id, img]) => (
                                    <CarouselItem
                                        key={id}
                                        className="flex items-center justify-center"
                                    >
                                        <ProjectImage
                                            img={img}
                                            title={title}
                                            className="max-h-[80dvh] max-w-full object-contain"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </div>
                        <CarouselNext
                            variant="secondary"
                            className="hidden shrink-0 md:inline-flex"
                        />
                    </div>
                    <div className="flex items-baseline justify-center gap-3 text-sm text-white">
                        <span className="font-semibold">{title}</span>
                        <CarouselCounter className="text-white/70" />
                    </div>
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};
