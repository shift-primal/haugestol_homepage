import {
	EnvelopeIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import { SITE } from "#/lib/content";

const scrollToSection = (id: string) =>
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const HeroActions = () => (
	<div className="flex flex-wrap items-center gap-3 pointer-events-auto">
		<Button onClick={() => scrollToSection("projects")}>Se prosjekter</Button>
		<Button
			variant="outline"
			size="icon-lg"
			aria-label="GitHub"
			nativeButton={false}
			render={(props) => (
				<a href={SITE.github} target="_blank" rel="noreferrer" {...props}>
					<GithubLogoIcon />
				</a>
			)}
		/>
		<Button
			variant="outline"
			size="icon-lg"
			aria-label="LinkedIn"
			nativeButton={false}
			render={(props) => (
				<a href={SITE.linkedin} target="_blank" rel="noreferrer" {...props}>
					<LinkedinLogoIcon />
				</a>
			)}
		/>
		<Button
			variant="outline"
			size="icon-lg"
			aria-label="Contact section"
			onClick={() => scrollToSection("contact")}
		>
			<EnvelopeIcon />
		</Button>
	</div>
);
