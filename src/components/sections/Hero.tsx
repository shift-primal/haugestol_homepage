import { SectionContainer } from "#/components/layout/SectionContainer";
import { HeroActions } from "#/components/sections/hero/HeroActions";
import { HeroIntro } from "#/components/sections/hero/HeroIntro";
import { TAGLINE } from "#/lib/config";

export const Hero = () => (
	<SectionContainer sectionName="hero">
		<div className="flex min-h-[40svh] flex-col justify-center gap-6 lg:min-h-0 lg:justify-normal">
			<HeroIntro />
			<p className="max-w-lg text-muted-foreground pointer-events-auto">
				{TAGLINE}
			</p>
			<HeroActions />
		</div>
	</SectionContainer>
);
