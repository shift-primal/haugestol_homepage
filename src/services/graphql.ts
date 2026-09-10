import { graphql } from "@octokit/graphql";

const token: string | undefined = process.env.GITHUB_TOKEN;

if (!token) {
    throw new Error("Missing GITHUB_TOKEN in .env");
}

export const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: `token ${token}`,
    },
});
