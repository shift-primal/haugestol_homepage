import type React from "react";
import { useMemo } from "react";
import { cn } from "#/lib/shadcn.utils";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	squares?: [number, number]; // [horizontal, vertical]
	className?: string;
	squaresClassName?: string;
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
	width = 40,
	height = 40,
	squares = [24, 24],
	className,
	squaresClassName,
}: InteractiveGridPatternProps) {
	const [horizontal, vertical] = squares;

	const gridRects = useMemo(() => {
		return Array.from({ length: horizontal * vertical }).map((_, index) => ({
			id: index,
			x: (index % horizontal) * width,
			y: Math.floor(index / horizontal) * height,
		}));
	}, [horizontal, vertical, width, height]);

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <no need for title>
		<svg
			width={width * horizontal}
			height={height * vertical}
			className={cn(
				"absolute border-gray-400/30 select-none pointer-events-none sm:pointer-events-auto",
				className,
			)}
		>
			{gridRects.map((rect) => (
				<rect
					key={rect.id}
					x={rect.x}
					y={rect.y}
					width={width}
					height={height}
					className={cn(
						"fill-transparent stroke-gray-400/30 transition-[fill] duration-50 ease-in-out",
						"lg:hover:fill-gray-600/10 lg:hover:dark:fill-gray-300/10 lg:not-[&:hover]:duration-1000",
						squaresClassName,
					)}
				/>
			))}
		</svg>
	);
}
