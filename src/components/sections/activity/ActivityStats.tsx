import { m } from "#/paraglide/messages";
import type { CommitStats } from "#/server/fetchGitHubData";

const StatCell = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center gap-1 px-4 py-4">
        <span className="font-mono text-2xl font-semibold text-foreground">
            {value}
        </span>
        <span className="font-mono text-xs tracking-wide text-muted-foreground">
            {label}
        </span>
    </div>
);

export const ActivityStats = ({ stats }: { stats: CommitStats }) => (
    <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        <StatCell
            label={m.activity_stat_week()}
            value={stats.week}
        />
        <StatCell
            label={m.activity_stat_month()}
            value={stats.month}
        />
        <StatCell
            label={m.activity_stat_year()}
            value={stats.year}
        />
    </div>
);
