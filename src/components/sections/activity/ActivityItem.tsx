import { GitCommitIcon } from "@phosphor-icons/react";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "#/components/shadcn/item";
import { formatRelativeTime } from "#/lib/relative-time";
import type { Locale } from "#/paraglide/runtime";
import type { RecentCommit } from "#/server/fetchGitHubData";

export const ActivityItem = ({
    commit,
    locale,
}: {
    commit: RecentCommit;
    locale: Locale;
}) => {
    return (
        <Item
            className="rounded-none px-4 py-3"
            render={(props) => (
                <a
                    {...props}
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer"
                />
            )}
        >
            <ItemMedia variant="icon-circle">
                <GitCommitIcon />
            </ItemMedia>
            <ItemContent className="min-w-0">
                <ItemTitle className="font-mono text-foreground/90">
                    {commit.message}
                </ItemTitle>
                <ItemDescription className="font-mono">
                    {commit.repo} ·{" "}
                    {formatRelativeTime(commit.committedDate, locale)}
                </ItemDescription>
            </ItemContent>
        </Item>
    );
};
