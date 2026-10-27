export const CvSideSection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section>
        <h2 className="cv-heading-underline mb-3 pb-2 text-cv-heading font-semibold tracking-[0.16em] text-cv-navy uppercase">
            {title}
        </h2>
        {children}
    </section>
);

export const CvMainSection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section>
        <h2 className="mb-2 bg-cv-navy pl-[3.6mm] text-cv-heading leading-7 font-semibold tracking-[0.16em] text-white uppercase">
            {title}
        </h2>
        {children}
    </section>
);
