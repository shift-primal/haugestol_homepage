export const PageContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="mx-auto min-h-full overflow-x-hidden relative"
			id="page-container"
		>
			{children}
		</div>
	);
};
