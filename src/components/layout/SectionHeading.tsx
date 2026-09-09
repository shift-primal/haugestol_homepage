import { KineticText } from "#/components/shadcn/kinetic-text";
import { Kicker } from "#/components/ui/Kicker";
import { cn } from "#/lib/shadcn.utils";

export const SectionHeading = ({
    text,
    kicker,
    className,
}: {
    text: string;
    kicker?: string;
    className?: string;
}) => (
    <div className="mb-10 sm:mb-12">
        {kicker && <Kicker text={kicker} />}
        <KineticText
            as="h2"
            text={text}
            className={cn("text-3xl sm:text-4xl lg:text-5xl w-fit", className)}
        />
    </div>
);
