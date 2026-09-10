import { createFileRoute } from "@tanstack/react-router";
import { GridBackground } from "#/components/layout/GridBackground";
import { PageContainer } from "#/components/layout/PageContainer";
import { About } from "#/components/sections/About";
import { Activity } from "#/components/sections/Activity";
import { Contact } from "#/components/sections/Contact";
import { Hero } from "#/components/sections/Hero";
import { Projects } from "#/components/sections/Projects";
import { Skills } from "#/components/sections/Skills";
import { fetchGitHubData } from "#/server/fetchGitHubData";

const Home = () => {
    const { commits, stats } = Route.useLoaderData();

    return (
        <PageContainer>
            <GridBackground />
            <div className="mt-24 mb-12 lg:mt-32">
                <Hero />
                <About />
                <Skills />
                <Projects />
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
    loader: async () => {
        // Never let a GitHub API hiccup take the homepage down with it.
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
