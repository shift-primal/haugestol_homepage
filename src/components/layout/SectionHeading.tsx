import { KineticText } from "#/components/shadcn/kinetic-text";
import { cn } from "#/lib/shadcn.utils";

export const SectionHeading = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => (
    // more room above than below, so a heading reads as the start of its
    // section rather than the end of the one before
    <div className="mb-10 flex items-end gap-[0.12em] pt-8 text-4xl tracking-tight sm:mb-14 sm:pt-12 sm:text-5xl lg:text-6xl">
        <KineticText
            as="h2"
            text={text}
            className={cn("w-fit leading-none", className)}
        />
    </div>
);
