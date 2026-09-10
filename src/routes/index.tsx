import { createFileRoute } from "@tanstack/react-router";
import { GridBackground } from "#/components/layout/GridBackground";
import { PageContainer } from "#/components/layout/PageContainer";
import { About } from "#/components/sections/About";
import { Contact } from "#/components/sections/Contact";
import { Hero } from "#/components/sections/Hero";
import { Projects } from "#/components/sections/Projects";
import { Skills } from "#/components/sections/Skills";

const Home = () => {
    return (
        <PageContainer>
            <GridBackground />
            <div className="mt-24 mb-12 lg:mt-32">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </div>
        </PageContainer>
    );
};
export const Route = createFileRoute("/")({
    component: Home,
});
