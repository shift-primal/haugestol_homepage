// import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";
import { Navbar } from "#/components/layout/Navbar";
import appCss from "../styles.css?url";

const RootDocument = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="no" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="overflow-hidden">
				<ThemeProvider attribute="class">
					<div className="fixed inset-0 flex flex-col">
						<Navbar />
						<main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
					</div>
				</ThemeProvider>
				{/* <TanStackDevtools */}
				{/* 	plugins={[ */}
				{/* 		{ */}
				{/* 			name: "Tanstack Router", */}
				{/* 			render: <TanStackRouterDevtoolsPanel />, */}
				{/* 		}, */}
				{/* 	]} */}
				{/* /> */}
				<Scripts />
			</body>
		</html>
	);
};

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Haugestol",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});
