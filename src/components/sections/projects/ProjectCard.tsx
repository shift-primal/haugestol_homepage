import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
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
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "#/components/shadcn/carousel";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "#/components/shadcn/dialog";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "#/components/shadcn/hover-card";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import type { Project } from "#/lib/config";

interface DialogProps {
	id: string;
	img: Img;
	title: string;
}

const ProjectImage = ({ img, title }: Omit<DialogProps, "id">) => (
	<img
		src={img.src}
		srcSet={img.srcset}
		sizes="90vw"
		width={img.w}
		height={img.h}
		alt={`${title} preview`}
		loading="lazy"
		className="relative z-20 aspect-video w-full object-cover"
	/>
);

const ProjectDialog = ({ img, title }: DialogProps) => (
	<Dialog>
		<DialogTrigger className="block w-full cursor-zoom-in">
			<img
				src={img.src}
				srcSet={img.srcset}
				sizes="(min-width: 1024px) 400px, 90vw"
				width={img.w}
				height={img.h}
				alt={`${title} preview`}
				loading="lazy"
				className="relative z-20 aspect-video w-full object-cover"
			/>
		</DialogTrigger>
		<DialogContent className="fixed inset-0 top-0 left-0 h-screen w-screen max-w-none translate-x-0 translate-y-0 border-none bg-transparent p-0 ring-0 sm:max-w-none">
			<DialogClose className="flex h-full w-full appearance-none items-center justify-center border-0 bg-transparent p-4 outline-none cursor-zoom-out">
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: only stops the close-click from bubbling; Escape/close button still close the dialog for keyboard users */}
				<img
					src={img.src}
					srcSet={img.srcset}
					sizes="100vw"
					width={img.w}
					height={img.h}
					alt={`${title} preview`}
					loading="lazy"
					onClick={(event) => event.stopPropagation()}
					className="max-h-full max-w-full cursor-default object-contain"
				/>
			</DialogClose>
		</DialogContent>
	</Dialog>
);

export const ProjectCard = ({
	title,
	liveHref,
	githubHref,
	description,
	images,
}: Project) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	return (
		<Card className="w-full pt-0">
			<Carousel>
				<CarouselContent>
					{Object.entries(images).map(([id, img]) => (
						<CarouselItem key={id}>
							<div className="p-4 md:p-2">
								{isDesktop ? (
									<ProjectDialog id={id} img={img} title={title} />
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
			<CardHeader>
				<CardAction>
					<Button
						variant="outline"
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
				<HoverCard>
					<HoverCardTrigger>
						<Button
							disabled={!liveHref}
							variant="outline"
							className="w-full"
							nativeButton={false}
							render={(props) => (
								<a {...props} href={liveHref} rel="noopener" target="_blank">
									<span>Se live demo!</span>
									<ArrowRightIcon />
								</a>
							)}
						/>
					</HoverCardTrigger>
					{!liveHref && (
						<HoverCardContent className="bg-destructive/75">
							Project has not been deployed yet!
						</HoverCardContent>
					)}
				</HoverCard>
			</CardContent>
		</Card>
	);
};
