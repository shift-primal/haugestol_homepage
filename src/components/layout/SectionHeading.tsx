import { KineticText } from "#/components/shadcn/kinetic-text";
import { cn } from "#/lib/shadcn.utils";

export const SectionHeading = ({
	text,
	className,
}: {
	text: string;
	className?: string;
}) => (
	<KineticText
		as="h2"
		text={text}
		className={cn("text-3xl sm:text-4xl lg:text-5xl", className)}
	/>
);
