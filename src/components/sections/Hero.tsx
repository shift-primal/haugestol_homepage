import { SectionContainer } from "#/components/layout/SectionContainer";
import { HeroActions } from "#/components/sections/hero/HeroActions";
import { HeroIntro } from "#/components/sections/hero/HeroIntro";
import { HERO } from "#/lib/content";

export const Hero = () => (
	<SectionContainer sectionName="hero">
		<div className="flex min-h-[40svh] flex-col justify-center gap-6 lg:min-h-0 lg:justify-normal mt-0 lg:mt-20">
			<HeroIntro />
			<p className="max-w-lg text-muted-foreground pointer-events-auto">
				{HERO.tagline}
			</p>
			<HeroActions />
		</div>
	</SectionContainer>
);
