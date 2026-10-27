import { ArrowLeftIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CvDocument } from "#/components/cv/CvDocument";
import { Button } from "#/components/shadcn/button";
import { getCv } from "#/content";
import { useFitWidth } from "#/hooks/useFitWidth";
import { absoluteUrl, localizedPageLinks } from "#/lib/seo";
import { m } from "#/paraglide/messages";

const A4_WIDTH_PX = 793.7;

const CvPage = () => {
    const { ref, scale } = useFitWidth<HTMLDivElement>(A4_WIDTH_PX);

    return (
        <div className="mx-auto flex w-full max-w-[210mm] flex-col gap-6 px-4 pt-24 pb-16 sm:px-0 lg:pt-32 print:block print:max-w-none print:p-0">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between print:hidden">
                <Button
                    variant="ghost"
                    nativeButton={false}
                    render={(props) => (
                        <Link
                            {...props}
                            to="/"
                        >
                            <ArrowLeftIcon data-icon="inline-start" />
                            <span>{m.back_home()}</span>
                        </Link>
                    )}
                />
                <Button
                    onClick={() => window.print()}
                    title={m.cv_download_hint()}
                >
                    <span>{m.cv_download()}</span>
                    <DownloadSimpleIcon data-icon="inline-end" />
                </Button>
            </div>
            <div ref={ref}>
                <div
                    style={
                        {
                            "--cv-zoom": scale,
                        } as React.CSSProperties
                    }
                    className="w-fit text-shadow-none shadow-[0_2mm_8mm_rgb(0_0_0/0.3)] [zoom:var(--cv-zoom)] [page:cv] print:shadow-none print:[zoom:1]"
                >
                    <CvDocument cv={getCv()} />
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute("/cv")({
    head: () => ({
        meta: [
            {
                title: m.cv_meta_title(),
            },
            {
                name: "description",
                content: m.cv_meta_description(),
            },
            {
                property: "og:url",
                content: absoluteUrl("/cv"),
            },
            {
                property: "og:title",
                content: m.cv_meta_title(),
            },
            {
                property: "og:description",
                content: m.cv_meta_description(),
            },
        ],
        links: localizedPageLinks("/cv"),
    }),
    component: CvPage,
});
