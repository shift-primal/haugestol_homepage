import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import type { Img } from "vite-imagetools";
import { Button } from "#/components/shadcn/button";
import {
	Card,
	CardAction,
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
import { Dialog, DialogContent } from "#/components/shadcn/dialog";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "#/components/shadcn/hover-card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/shadcn/popover";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import type { Project } from "#/lib/content";

const ProjectImage = ({
	img,
	title,
	className = "relative z-20 aspect-video w-full object-cover",
}: {
	img: Img;
	title: string;
	className?: string;
}) => (
	<img
		src={img.src}
		srcSet={img.srcset}
		sizes="90vw"
		width={img.w}
		height={img.h}
		alt={`${title} preview`}
		loading="lazy"
		className={className}
	/>
);

export const ProjectCard = ({
	title,
	liveHref,
	githubHref,
	description,
	images,
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
	}, [lightboxOpen, lightboxApi, startIndex]);

	const openLightbox = (index: number) => {
		setStartIndex(index);
		setLightboxOpen(true);
	};

	return (
		<Card className="w-full pt-0">
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
										<ProjectImage img={img} title={title} />
									</button>
								) : (
									<ProjectImage img={img} title={title} />
								)}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious variant="secondary" className="left-4 opacity-65" />
				<CarouselNext variant="secondary" className="right-4 opacity-65" />
			</Carousel>

			{isDesktop && (
				<Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
					<DialogContent className="max-w-7xl border-none bg-transparent ring-0 sm:max-w-7xl">
						<Carousel
							setApi={setLightboxApi}
							opts={{ startIndex, loop: true }}
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
							<CarouselPrevious variant="secondary" className="opacity-65" />
							<CarouselNext variant="secondary" className="opacity-65" />
						</Carousel>
					</DialogContent>
				</Dialog>
			)}

			<CardHeader>
				<CardAction>
					<Button
						variant="outline"
						aria-label={`${title} on GitHub`}
						nativeButton={false}
						render={(props) => (
							<a {...props} href={githubHref} rel="noopener" target="_blank">
								<GithubLogoIcon />
							</a>
						)}
					/>
				</CardAction>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{isDesktop ? (
					<HoverCard>
						<HoverCardTrigger
							render={({ ref, ...triggerProps }) => (
								<Button
									disabled={!liveHref}
									variant="outline"
									className="w-full"
									nativeButton={false}
									render={(buttonProps) => (
										<a
											{...buttonProps}
											{...triggerProps}
											ref={ref}
											href={liveHref}
											rel="noopener"
											target="_blank"
										>
											<span>Se live demo!</span>
											<ArrowRightIcon />
										</a>
									)}
								/>
							)}
						/>

						{!liveHref && (
							<HoverCardContent className="bg-destructive/75">
								Project has not been deployed yet!
							</HoverCardContent>
						)}
					</HoverCard>
				) : (
					<Popover>
						<PopoverTrigger
							render={({ ref, ...triggerProps }) => (
								<Button
									disabled={!liveHref}
									variant="outline"
									className="w-full"
									nativeButton={false}
									render={(buttonProps) => (
										<a
											{...buttonProps}
											{...triggerProps}
											ref={ref}
											href={liveHref}
											rel="noopener"
											target="_blank"
										>
											<span>Se live demo!</span>
											<ArrowRightIcon />
										</a>
									)}
								/>
							)}
						/>

						{!liveHref && (
							<PopoverContent className="w-64 bg-destructive/75 text-xs/relaxed">
								Project has not been deployed yet!
							</PopoverContent>
						)}
					</Popover>
				)}
			</CardContent>
		</Card>
	);
};
