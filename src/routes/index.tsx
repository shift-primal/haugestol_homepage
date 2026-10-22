import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { Background } from "#/components/layout/Background.tsx";
import { PageContainer } from "#/components/layout/PageContainer";
import { About } from "#/components/sections/About";
import { Activity } from "#/components/sections/Activity";
import { Contact } from "#/components/sections/Contact";
import { Hero } from "#/components/sections/Hero";
import { Projects } from "#/components/sections/Projects";
import { absoluteUrl, localizedPageLinks } from "#/lib/seo";
import { fetchGitHubData } from "#/server/fetchGitHubData";

const Home = () => {
    const { commits, stats } = Route.useLoaderData();
    const { resolvedTheme } = useTheme();

    return (
        <PageContainer>
            <Background theme={resolvedTheme} />
            <div className="mt-24 mb-2 lg:mb-8 lg:mt-32">
                <Hero />
                <Projects />
                <About />
                <Activity
                    commits={commits}
                    stats={stats}
                />
                <Contact />
            </div>
        </PageContainer>
    );
};
export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            {
                property: "og:url",
                content: absoluteUrl("/"),
            },
        ],
        links: localizedPageLinks("/"),
    }),
    loader: async () => {
        try {
            return await fetchGitHubData();
        } catch {
            return {
                commits: [],
                stats: {
                    week: 0,
                    month: 0,
                    year: 0,
                },
            };
        }
    },
    component: Home,
});
