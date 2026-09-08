import { createFileRoute } from "@tanstack/react-router";
import { GridBackground } from "#/components/layout/GridBackground";
import { PageContainer } from "#/components/layout/PageContainer";
import { About } from "#/components/sections/About";
import { Contact } from "#/components/sections/Contact";
import { Hero } from "#/components/sections/Hero";
import { Projects } from "#/components/sections/Projects";
import { Rope } from "#/components/ui/Rope";

const Home = () => {
	return (
		<PageContainer>
			<GridBackground />
			<Rope />
			<div className="mt-0 lg:mt-20">
				<Hero />
				<About />
				<Projects />
				<Contact />
			</div>
		</PageContainer>
	);
};
export const Route = createFileRoute("/")({ component: Home });
