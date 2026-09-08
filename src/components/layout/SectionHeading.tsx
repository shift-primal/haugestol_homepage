import { KineticText } from "#/components/shadcn/kinetic-text";
import { cn } from "#/lib/shadcn.utils";

export const SectionHeading = ({
	text,
	kicker,
	className,
}: {
	text: string;
	kicker?: string;
	className?: string;
}) => (
	<div>
		{kicker && (
			<p className="mb-2 font-mono text-xs tracking-widest text-muted-foreground w-fit">
				{kicker}
			</p>
		)}
		<KineticText
			as="h2"
			text={text}
			className={cn("text-3xl sm:text-4xl lg:text-5xl w-fit", className)}
		/>
	</div>
);
