import { InteractiveGridPattern } from "#/components/shadcn/interactive-grid-pattern";

export const GridBackground = () => {
	return (
		<div className="absolute inset-0 overflow-clip pointer-events-none mask-[radial-gradient(at_center,black_50%,transparent_70%)]">
			<div className="relative flex h-full skew-y-12">
				<InteractiveGridPattern
					squares={[64, 64]}
					className="inset-x-0 inset-y-0 w-fit place-self-center pointer-events-none"
				/>
			</div>
		</div>
	);
};
