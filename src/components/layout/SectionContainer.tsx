export const SectionContainer = ({
	children,
	sectionName,
}: {
	children: React.ReactNode;
	sectionName: string;
}) => (
	<section
		id={sectionName}
		className="relative z-10 py-16 px-4 md:px-16 xl:px-48 2xl:px-64 pointer-events-none"
	>
		{children}
	</section>
);
