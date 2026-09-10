import { SectionContainer } from "#/components/layout/SectionContainer";
import { SectionHeading } from "#/components/layout/SectionHeading";
import { ActivityItem } from "#/components/sections/activity/ActivityItem";
import { ActivityStats } from "#/components/sections/activity/ActivityStats";
import { Card, CardContent } from "#/components/shadcn/card";
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
            <Card className="bg-transparent backdrop-blur-xs">
                <ActivityStats stats={stats} />
                <CardContent className="flex flex-col px-0">
                    {commits.map((commit, index) => (
                        <ActivityItem
                            key={commit.url}
                            index={index}
                            commit={commit}
                            totalCommits={commits.length - 1}
                            locale={locale}
                        />
                    ))}
                </CardContent>
            </Card>
        </SectionContainer>
    );
};
