import { useState } from "react";
import type { Img } from "vite-imagetools";
import { ProjectImage } from "#/components/sections/projects/ProjectImage";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "#/components/shadcn/carousel";
import { Dialog, DialogContent, DialogTitle } from "#/components/shadcn/dialog";

export const ProjectLightbox = ({
    title,
    imageEntries,
    open,
    onOpenChange,
    startIndex,
}: {
    title: string;
    imageEntries: [
        string,
        Img,
    ][];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    startIndex: number;
}) => {
    const [api, setApi] = useState<CarouselApi>();

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="max-w-7xl border-none bg-transparent ring-0 sm:max-w-7xl"
                // the carousel only handles arrows while focus is inside it; the
                // dialog opens with focus elsewhere, so handle them for the whole popup
                onKeyDown={(event) => {
                    if (event.defaultPrevented) return;
                    if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        api?.scrollPrev();
                    } else if (event.key === "ArrowRight") {
                        event.preventDefault();
                        api?.scrollNext();
                    }
                }}
            >
                <DialogTitle className="sr-only">
                    Lightbox for image carousel
                </DialogTitle>
                <Carousel
                    setApi={setApi}
                    opts={{
                        startIndex,
                        loop: true,
                    }}
                    className="w-full max-w-7xl cursor-default flex gap-6"
                >
                    <CarouselPrevious
                        variant="secondary"
                        className="opacity-65"
                    />
                    <CarouselContent>
                        {imageEntries.map(([id, img]) => (
                            <CarouselItem
                                key={id}
                                className="flex items-center justify-center"
                            >
                                <ProjectImage
                                    img={img}
                                    title={title}
                                    className="max-h-[85vh] max-w-full object-contain"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext
                        variant="secondary"
                        className="opacity-65"
                    />
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};
