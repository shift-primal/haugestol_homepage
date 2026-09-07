export const SectionContainer = ({
	children,
	sectionName,
}: {
	children: React.ReactNode;
	sectionName: string;
}) => (
	<section
		id={sectionName}
		className="relative z-10 py-10 px-4 sm:py-12 md:px-16 md:py-16 xl:px-48 xl:py-24 2xl:px-64 pointer-events-none"
	>
		{children}
	</section>
);
