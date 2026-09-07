export const PageContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="mx-auto min-h-full overflow-x-hidden p-4 relative sm:p-6"
			id="page-container"
		>
			{children}
		</div>
	);
};
