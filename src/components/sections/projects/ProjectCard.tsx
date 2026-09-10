import { GithubLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
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
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "#/components/shadcn/carousel";
import type { Project } from "#/content";
import { useMediaQuery } from "#/hooks/useMediaQuery";
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

    const openLightbox = (index: number) => {
        setStartIndex(index);
        setLightboxOpen(true);
    };

    return (
        <Card className="h-full w-full bg-transparent backdrop-blur-lg hover:scale-102 duration-300">
            <Carousel
                opts={{
                    loop: true,
                }}
            >
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
                                            className="border"
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
                    className="left-4 opacity-65 absolute"
                />
                <CarouselNext
                    variant="secondary"
                    className="right-4 opacity-65 absolute"
                />
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
                </div>

                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="mt-auto flex justify-center items-center gap-2">
                {githubHref && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="self-end"
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
                )}
                <LinkToDemoButton
                    liveHref={liveHref}
                    ctaText={ctaText}
                />
            </CardContent>
        </Card>
    );
};
