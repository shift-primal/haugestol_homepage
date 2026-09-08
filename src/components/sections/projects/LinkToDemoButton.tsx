import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/shadcn/popover";

export const LinkToDemoButton = ({
	liveHref,
	ctaText = "Se live demo!",
}: {
	liveHref?: string;
	ctaText?: string;
}) => (
	<Popover>
		<PopoverTrigger
			nativeButton={false}
			render={({ ref, ...triggerProps }) => (
				<Button
					disabled={!liveHref}
					variant="outline"
					className="w-full"
					nativeButton={false}
					render={(buttonProps) => (
						<a
							{...buttonProps}
							{...triggerProps}
							ref={ref}
							href={liveHref}
							rel="noopener"
							target="_blank"
						>
							<span>{ctaText}</span>
							<ArrowRightIcon />
						</a>
					)}
				/>
			)}
		/>

		{!liveHref && (
			<PopoverContent className="w-64 bg-destructive/75 text-xs/relaxed">
				Prosjektet er ikke live enda.
			</PopoverContent>
		)}
	</Popover>
);
