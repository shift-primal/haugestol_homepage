import { createFileRoute } from "@tanstack/react-router";
import { GridBackground } from "#/components/layout/GridBackground";
import { PageContainer } from "#/components/layout/PageContainer";
import { Hero } from "#/components/sections/Hero";

const Home = () => {
	return (
		<PageContainer>
			<GridBackground />
			<Hero />
		</PageContainer>
	);
};
export const Route = createFileRoute("/")({ component: Home });
