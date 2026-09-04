import { SectionContainer } from "#/components/layout/SectionContainer";
import { TypingAnimation } from "#/components/shadcn/typing-animation";
import { WordRotate } from "#/components/shadcn/word-rotate";
import { NAME, TECHNOLOGIES_SHOWCASE } from "#/lib/config";

export const Hero = () => (
	<SectionContainer sectionName="hero">
		<div className="flex flex-col ml-64 mt-16">
			<div className="relative">
				<span
					aria-hidden
					className="invisible inline-block whitespace-nowrap text-7xl font-bold tracking-tight"
				>
					{NAME}
				</span>
				<TypingAnimation className="absolute inset-0 whitespace-nowrap text-7xl font-bold tracking-tight">
					{NAME}
				</TypingAnimation>
			</div>
			<WordRotate
				words={TECHNOLOGIES_SHOWCASE}
				className="text-4xl tracking-tighter"
			/>
		</div>
	</SectionContainer>
);
