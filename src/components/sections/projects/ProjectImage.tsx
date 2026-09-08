import type { Img } from "vite-imagetools";

export const ProjectImage = ({
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
