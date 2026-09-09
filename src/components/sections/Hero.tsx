import { SectionContainer } from "#/components/layout/SectionContainer";
import { HeroActions } from "#/components/sections/hero/HeroActions";
import { HeroIntro } from "#/components/sections/hero/HeroIntro";
import { getHero } from "#/lib/content";

export const Hero = () => (
    <SectionContainer sectionName="hero">
        <div className="flex flex-col justify-center gap-6">
            <HeroIntro />
            <p className="max-w-lg text-muted-foreground pointer-events-auto">
                {getHero().tagline}
            </p>
            <HeroActions />
        </div>
    </SectionContainer>
);
