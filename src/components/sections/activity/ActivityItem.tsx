import { GitCommitIcon } from "@phosphor-icons/react";
import { formatRelativeTime } from "#/lib/relative-time";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";
import type { Locale } from "#/paraglide/runtime";
import type { RecentCommit } from "#/server/fetchGitHubData";

export const ActivityItem = ({
    index,
    commit,
    totalCommits,
    locale,
}: {
    index: number;
    commit: RecentCommit;
    totalCommits: number;
    locale: Locale;
}) => {
    return (
        <a
            key={commit.url}
            href={commit.url}
            target="_blank"
            rel="noreferrer"
            aria-label={m.activity_commit_aria({
                repo: commit.repo,
            })}
            className={cn(
                "group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-foreground/5 duration-150",
                index !== totalCommits && "border-b border-border"
            )}
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground/70 transition-colors group-hover:bg-foreground/20 group-hover:text-foreground">
                <GitCommitIcon className="size-4" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-mono text-sm text-foreground/90 transition-colors group-hover:text-foreground">
                    {commit.message}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                    {commit.repo} ·{" "}
                    {formatRelativeTime(commit.committedDate, locale)}
                </span>
            </span>
        </a>
    );
};
