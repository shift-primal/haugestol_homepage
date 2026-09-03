export const SectionContainer = ({
	children,
	sectionName,
}: {
	children: React.ReactNode;
	sectionName: string;
}) => (
	<section id={sectionName} className="relative z-10">
		{children}
	</section>
);
