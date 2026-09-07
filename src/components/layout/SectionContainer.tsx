import { cn } from "#/lib/shadcn.utils";

export const SectionContainer = ({
	children,
	sectionName,
	className,
}: {
	children: React.ReactNode;
	sectionName: string;
	className?: string;
}) => (
	<section
		id={sectionName}
		className={cn(
			"relative z-10 mx-auto w-full max-w-7xl px-4 py-14 pointer-events-none sm:px-6 sm:py-20 lg:px-8 lg:py-28",
			className,
		)}
	>
		{children}
	</section>
);
