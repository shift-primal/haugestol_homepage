export const SectionContainer = ({
	children,
	sectionName,
}: {
	children: React.ReactNode;
	sectionName: string;
}) => (
	<section
		id={sectionName}
		className="relative z-10 py-16 px-8 md:px-16 xl:px-32 2xl:px-48"
	>
		{children}
	</section>
);
