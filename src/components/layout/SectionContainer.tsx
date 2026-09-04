export const SectionContainer = ({
	children,
	sectionName,
}: {
	children: React.ReactNode;
	sectionName: string;
}) => (
	// TODO: Remove border, placeholder while developing
	<section id={sectionName} className="relative z-10 border-2 border-red-500">
		{children}
	</section>
);
