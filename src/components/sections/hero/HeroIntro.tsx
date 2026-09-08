import { TypingAnimation } from "#/components/shadcn/typing-animation";
import { WordRotate } from "#/components/shadcn/word-rotate";
import { HERO, SITE } from "#/lib/content";
import { cn } from "#/lib/shadcn.utils";

const NAME_WITH_LINE_BREAK = SITE.name.replace(" ", "\n");

const HEADING_CLASSNAME =
	"whitespace-pre-line text-5xl font-bold tracking-tight sm:whitespace-nowrap md:text-6xl lg:text-7xl";

export const HeroIntro = () => (
	<div>
		<div className="relative min-w-fit pointer-events-auto">
			<span
				aria-hidden
				className={cn("invisible inline-block", HEADING_CLASSNAME)}
			>
				{NAME_WITH_LINE_BREAK}
			</span>
			<TypingAnimation className={cn("absolute inset-0", HEADING_CLASSNAME)}>
				{NAME_WITH_LINE_BREAK}
			</TypingAnimation>
		</div>
		<WordRotate
			words={HERO.technologies}
			className="text-xl tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl"
		/>
	</div>
);
