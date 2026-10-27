import { KineticText } from "#/components/shadcn/kinetic-text";
import { cn } from "#/lib/shadcn.utils";

export const SectionHeading = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => (
    <div className="mb-6 flex items-end gap-[0.12em] pt-12 text-4xl tracking-tight sm:mb-8 sm:pt-16 sm:text-5xl lg:mb-12 lg:text-6xl">
        <KineticText
            as="h2"
            text={text}
            className={cn("w-fit leading-none", className)}
        />
    </div>
);
