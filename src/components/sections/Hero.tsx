import { SectionContainer } from "#/components/layout/SectionContainer";
import { TypingAnimation } from "#/components/shadcn/typing-animation";
import { WordRotate } from "#/components/shadcn/word-rotate";
import { NAME, TECHNOLOGIES_SHOWCASE } from "#/lib/config";

export const Hero = () => (
	<SectionContainer sectionName="hero">
		<TypingAnimation className="text-7xl font-bold tracking-tight">
			{NAME}
		</TypingAnimation>
		<WordRotate
			words={TECHNOLOGIES_SHOWCASE}
			className="text-4xl tracking-tighter"
		/>
	</SectionContainer>
);
