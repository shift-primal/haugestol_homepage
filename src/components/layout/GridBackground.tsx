import { InteractiveGridPattern } from "#/components/shadcn/interactive-grid-pattern";
import { cn } from "#/lib/shadcn.utils";

export const GridBackground = () => {
	return (
		<div className="absolute w-full h-full overflow-clip top-1/2 left-1/2 -translate-1/2 mask-[radial-gradient(at_center,black_50%,transparent_70%)]">
			<div className="relative flex h-full skew-y-12">
				<InteractiveGridPattern
					squares={[64, 64]}
					className={cn("inset-x-0 inset-y-0 w-fit place-self-center")}
				/>
			</div>
		</div>
	);
};
