import { EnvelopeIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { Button } from "#/components/shadcn/button";
import { TypingAnimation } from "#/components/shadcn/typing-animation";
import { WordRotate } from "#/components/shadcn/word-rotate";
import { NAME, TAGLINE, TECHNOLOGIES_SHOWCASE } from "#/lib/config";

const NAME_WITH_LINE_BREAK = NAME.replace(" ", "\n");

export const Hero = () => (
	<SectionContainer sectionName="hero">
		<div className="flex min-h-[40svh] flex-col justify-center lg:min-h-0 lg:justify-normal items-center md:items-stretch px-8 md:px-0">
			<div>
				<div className="relative pointer-events-auto min-w-fit items-center px-4 md:px-0 md:items-stretch">
					<span
						aria-hidden
						className="invisible inline-block whitespace-pre-line text-5xl font-bold tracking-tight sm:whitespace-nowrap sm:font-bold md:text-6xl lg:text-7xl"
					>
						{NAME_WITH_LINE_BREAK}
					</span>
					<TypingAnimation className="absolute inset-0 whitespace-pre-line text-5xl font-bold tracking-tight sm:whitespace-nowrap sm:font-bold md:text-6xl lg:text-7xl">
						{NAME_WITH_LINE_BREAK}
					</TypingAnimation>
				</div>
				<WordRotate
					words={TECHNOLOGIES_SHOWCASE}
					className="text-xl tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl"
				/>
			</div>
			<p className="mt-4 text-muted-foreground w-fit pointer-events-auto sm:mt-6 md:px-0">
				{TAGLINE}
			</p>
			<div className="mt-4 flex flex-wrap items-center gap-3 w-fit sm:mt-6">
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
					aria-label="Contact section"
					onClick={() =>
						document
							.getElementById("projects")
							?.scrollIntoView({ behavior: "smooth" })
					}
				>
					<EnvelopeIcon />
				</Button>
			</div>
		</div>
	</SectionContainer>
);
