import { EnvelopeIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { Button } from "#/components/shadcn/button";
import { TypingAnimation } from "#/components/shadcn/typing-animation";
import { WordRotate } from "#/components/shadcn/word-rotate";
import { NAME, TAGLINE, TECHNOLOGIES_SHOWCASE } from "#/lib/config";

export const Hero = () => (
	<SectionContainer sectionName="hero">
		<div className="flex flex-col px-6 pt-12 sm:px-10 sm:pt-16 lg:px-0 lg:pt-0">
			<div className="relative">
				<span
					aria-hidden
					className="invisible inline-block whitespace-nowrap text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
				>
					{NAME}
				</span>
				<TypingAnimation className="absolute inset-0 whitespace-nowrap text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
					{NAME}
				</TypingAnimation>
			</div>
			<WordRotate
				words={TECHNOLOGIES_SHOWCASE}
				className="text-xl tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl"
			/>
			<p className="mt-6 max-w-md text-muted-foreground">{TAGLINE}</p>
			<div className="mt-6 flex flex-wrap items-center gap-3">
				<Button
					onClick={() =>
						document
							.getElementById("projects")
							?.scrollIntoView({ behavior: "smooth" })
					}
				>
					View projects
				</Button>
				<Button
					variant="outline"
					size="icon-lg"
					aria-label="GitHub"
					nativeButton={false}
					render={(props) => (
						<a
							href="https://github.com/shift-primal"
							target="_blank"
							rel="noreferrer"
							{...props}
						>
							<GithubLogoIcon />
						</a>
					)}
				/>
				<Button
					variant="outline"
					size="icon-lg"
					aria-label="Email"
					nativeButton={false}
					render={(props) => (
						<a href="mailto:kasper@haugestol.com" {...props}>
							<EnvelopeIcon />
						</a>
					)}
				/>
			</div>
		</div>
	</SectionContainer>
);
