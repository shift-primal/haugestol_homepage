import { GithubLogoIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { LinkToDemoButton } from "#/components/sections/projects/LinkToDemoButton";
import { ProjectImage } from "#/components/sections/projects/ProjectImage";
import { ProjectLightbox } from "#/components/sections/projects/ProjectLightbox";
import { Badge } from "#/components/shadcn/badge";
import { Button } from "#/components/shadcn/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "#/components/shadcn/card";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "#/components/shadcn/carousel";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import type { Project } from "#/lib/content";
import { m } from "#/paraglide/messages";

export const ProjectCard = ({
    title,
    badge,
    liveHref,
    githubHref,
    description,
    images,
    ctaText,
}: Project) => {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const imageEntries = Object.entries(images);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [lightboxApi, setLightboxApi] = useState<CarouselApi>();

    useEffect(() => {
        if (lightboxOpen && lightboxApi) {
            lightboxApi.scrollTo(startIndex, true);
        }
    }, [
        lightboxOpen,
        lightboxApi,
        startIndex,
    ]);

    const openLightbox = (index: number) => {
        setStartIndex(index);
        setLightboxOpen(true);
    };

    return (
        <Card className="h-full w-full bg-transparent backdrop-blur-lg">
            <Carousel>
                <CarouselContent>
                    {imageEntries.map(([id, img], index) => (
                        <CarouselItem key={id}>
                            <div className="p-4 md:p-2">
                                {isDesktop ? (
                                    <button
                                        type="button"
                                        className="block w-full cursor-zoom-in"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <ProjectImage
                                            img={img}
                                            title={title}
                                        />
                                    </button>
                                ) : (
                                    <ProjectImage
                                        img={img}
                                        title={title}
                                    />
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    variant="secondary"
                    className="left-4 opacity-65"
                />
                <CarouselNext
                    variant="secondary"
                    className="right-4 opacity-65"
                />
            </Carousel>

            {isDesktop && (
                <ProjectLightbox
                    title={title}
                    imageEntries={imageEntries}
                    open={lightboxOpen}
                    onOpenChange={setLightboxOpen}
                    startIndex={startIndex}
                    setApi={setLightboxApi}
                />
            )}

            <CardHeader>
                <div className="flex w-full items-center justify-between mb-4">
                    <CardTitle>{title}</CardTitle>

                    {badge && (
                        <Badge
                            variant="outline"
                            className="inline"
                        >
                            {badge}
                        </Badge>
                    )}
                    <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={m.project_github_aria({
                            title,
                        })}
                        nativeButton={false}
                        render={(props) => (
                            <a
                                {...props}
                                href={githubHref}
                                rel="noopener"
                                target="_blank"
                            >
                                <GithubLogoIcon />
                            </a>
                        )}
                    />
                </div>

                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="mt-auto">
                <LinkToDemoButton
                    liveHref={liveHref}
                    ctaText={ctaText}
                />
            </CardContent>
        </Card>
    );
};
