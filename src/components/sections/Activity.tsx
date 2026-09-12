import { Fragment } from "react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ActivityItem } from "#/components/sections/activity/ActivityItem";
import { ActivityStats } from "#/components/sections/activity/ActivityStats";
import { Card, CardContent } from "#/components/shadcn/card";
import { ItemGroup, ItemSeparator } from "#/components/shadcn/item";
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
    if (commits.length === 0) return null;

    const locale = getLocale();

    return (
        <SectionContainer sectionName="activity">
            <SectionHeading
                text={m.activity_heading()}
                kicker="// recent-github-activity"
            />
            <Card className="bg-glass">
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
            </Card>
        </SectionContainer>
    );
};
