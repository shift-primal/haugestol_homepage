import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Fragment } from "react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ActivityItem } from "#/components/sections/activity/ActivityItem";
import { ActivityStats } from "#/components/sections/activity/ActivityStats";
import { Card, CardContent } from "#/components/shadcn/card";
import { ItemGroup, ItemSeparator } from "#/components/shadcn/item";
import { SITE } from "#/content";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";
import type { CommitStats, RecentCommit } from "#/server/fetchGitHubData";

export const Activity = ({
    commits,
    stats,
}: {
    commits: RecentCommit[];
    stats: CommitStats;
}) => {
    const locale = getLocale();
    const unavailable = commits.length === 0;

    return (
        <SectionContainer sectionName="activity">
            <SectionHeading text={m.activity_heading()} />
            <Card className="py-0 gap-0">
                {unavailable ? (
                    <CardContent className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-6">
                        <p className="text-muted-foreground">
                            {m.activity_unavailable()}
                        </p>
                        <a
                            href={SITE.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 underline underline-offset-4 outline-none focus-ring"
                        >
                            {m.activity_unavailable_link()}
                            <ArrowUpRightIcon className="size-3.5" />
                        </a>
                    </CardContent>
                ) : (
                    <>
                        <ActivityStats stats={stats} />
                        <CardContent className="px-0">
                            <ItemGroup className="gap-0">
                                {commits.map((commit, index) => (
                                    <Fragment key={commit.url}>
                                        {index !== 0 && (
                                            <ItemSeparator className="my-0" />
                                        )}
                                        <ActivityItem
                                            commit={commit}
                                            locale={locale}
                                        />
                                    </Fragment>
                                ))}
                            </ItemGroup>
                        </CardContent>
                    </>
                )}
            </Card>
        </SectionContainer>
    );
};
