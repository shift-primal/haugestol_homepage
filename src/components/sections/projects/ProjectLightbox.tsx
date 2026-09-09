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
import { Dialog, DialogContent } from "#/components/shadcn/dialog";

export const ProjectLightbox = ({
    title,
    imageEntries,
    open,
    onOpenChange,
    startIndex,
    setApi,
}: {
    title: string;
    imageEntries: [
        string,
        Img,
    ][];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    startIndex: number;
    setApi: (api: CarouselApi) => void;
}) => (
    <Dialog
        open={open}
        onOpenChange={onOpenChange}
    >
        <DialogContent className="max-w-7xl border-none bg-transparent ring-0 sm:max-w-7xl">
            <Carousel
                setApi={setApi}
                opts={{
                    startIndex,
                    loop: true,
                }}
                className="w-full max-w-7xl cursor-default"
            >
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
                <CarouselPrevious
                    variant="secondary"
                    className="opacity-65"
                />
                <CarouselNext
                    variant="secondary"
                    className="opacity-65"
                />
            </Carousel>
        </DialogContent>
    </Dialog>
);
