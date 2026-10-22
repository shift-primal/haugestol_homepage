import { cn } from "#/lib/shadcn.utils";

export const SectionContainer = ({
    children,
    sectionName,
    className,
}: {
    children: React.ReactNode;
    sectionName: string;
    className?: string;
}) => (
    <section
        id={sectionName}
        className={cn(
            "relative z-10 mx-auto w-full max-w-7xl p-4 pointer-events-none sm:p-8",
            className
        )}
    >
        {children}
    </section>
);
