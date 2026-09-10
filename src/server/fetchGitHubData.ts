import { createServerFn } from "@tanstack/react-start";
import { graphqlWithAuth } from "#/services/graphql";

const REPOS_LIMIT = 5;
const COMMITS_PER_REPO = 5;
const RECENT_COMMITS_LIMIT = 5;

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_WINDOW_DAYS = 7;
const MONTH_WINDOW_DAYS = 30;
const YEAR_WINDOW_DAYS = 365;

const query = `
query GetActivity(
  $reposLimit: Int!
  $commitsLimit: Int!
  $weekStart: DateTime!
  $monthStart: DateTime!
  $yearStart: DateTime!
  $now: DateTime!
) {
  viewer {
    repositories(first: $reposLimit, orderBy: {field: PUSHED_AT, direction: DESC}, ownerAffiliations: OWNER) {
      nodes {
        name
        url
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: $commitsLimit) {
                nodes {
                  oid
                  message
                  committedDate
                  url
                }
              }
            }
          }
        }
      }
    }
    week: contributionsCollection(from: $weekStart, to: $now) {
      totalCommitContributions
    }
    month: contributionsCollection(from: $monthStart, to: $now) {
      totalCommitContributions
    }
    year: contributionsCollection(from: $yearStart, to: $now) {
      totalCommitContributions
    }
  }
}
`;

interface GitHubActivityResponse {
    viewer: {
        repositories: {
            nodes: Array<{
                name: string;
                url: string;
                defaultBranchRef: {
                    target: {
                        history: {
                            nodes: Array<{
                                oid: string;
                                message: string;
                                committedDate: string;
                                url: string;
                            }>;
                        };
                    } | null;
                } | null;
            }>;
        };
        week: {
            totalCommitContributions: number;
        };
        month: {
            totalCommitContributions: number;
        };
        year: {
            totalCommitContributions: number;
        };
    };
}

export interface RecentCommit {
    repo: string;
    repoUrl: string;
    message: string;
    committedDate: string;
    url: string;
}

export interface CommitStats {
    week: number;
    month: number;
    year: number;
}

export interface GitHubActivity {
    commits: RecentCommit[];
    stats: CommitStats;
}

export const fetchGitHubData = createServerFn({
    method: "GET",
}).handler(async (): Promise<GitHubActivity> => {
    const now = new Date();

    const response = await graphqlWithAuth<GitHubActivityResponse>(query, {
        reposLimit: REPOS_LIMIT,
        commitsLimit: COMMITS_PER_REPO,
        weekStart: new Date(
            now.getTime() - WEEK_WINDOW_DAYS * DAY_MS
        ).toISOString(),
        monthStart: new Date(
            now.getTime() - MONTH_WINDOW_DAYS * DAY_MS
        ).toISOString(),
        yearStart: new Date(
            now.getTime() - YEAR_WINDOW_DAYS * DAY_MS
        ).toISOString(),
        now: now.toISOString(),
    });

    const allCommits: RecentCommit[] =
        response.viewer.repositories.nodes.flatMap((repo) => {
            const commits = repo.defaultBranchRef?.target?.history.nodes ?? [];
            return commits.map((commit) => ({
                repo: repo.name,
                repoUrl: repo.url,
                // first line only — commit bodies can be multi-paragraph
                message: commit.message.split("\n")[0],
                committedDate: commit.committedDate,
                url: commit.url,
            }));
        });

    allCommits.sort(
        (a, b) =>
            new Date(b.committedDate).getTime() -
            new Date(a.committedDate).getTime()
    );

    return {
        commits: allCommits.slice(0, RECENT_COMMITS_LIMIT),
        stats: {
            week: response.viewer.week.totalCommitContributions,
            month: response.viewer.month.totalCommitContributions,
            year: response.viewer.year.totalCommitContributions,
        },
    };
});
