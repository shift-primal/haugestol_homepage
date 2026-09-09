import { createFileRoute } from "@tanstack/react-router";
import { GridBackground } from "#/components/layout/GridBackground";
import { PageContainer } from "#/components/layout/PageContainer";
import { About } from "#/components/sections/About";
import { Contact } from "#/components/sections/Contact";
import { Hero } from "#/components/sections/Hero";
import { Projects } from "#/components/sections/Projects";
import { LanguageSwitcher } from "#/components/ui/LanguageSwitcher";
import { LightSwitch } from "#/components/ui/LightSwitch";

const Home = () => {
    return (
        <PageContainer>
            <GridBackground />
            <LanguageSwitcher />
            <LightSwitch />
            <div className="mt-24 mb-12 lg:mt-32">
                <Hero />
                <About />
                <Projects />
                <Contact />
            </div>
        </PageContainer>
    );
};
export const Route = createFileRoute("/")({
    component: Home,
});
