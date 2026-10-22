import { MapPinIcon } from "@phosphor-icons/react";
import { SectionContainer } from "#/components/layout/SectionContainer";
import { HeroActions } from "#/components/sections/hero/HeroActions";
import { HeroIntro } from "#/components/sections/hero/HeroIntro";
import { getCvLocation, getHero } from "#/content";
import { m } from "#/paraglide/messages";

export const Hero = () => {
    const location = getCvLocation();

    return (
        <SectionContainer sectionName="hero">
            <div className="flex flex-col justify-center gap-6">
                <HeroIntro />
                <div className="flex max-w-lg flex-col gap-3 pointer-events-auto">
                    <p className="text-muted-foreground">{getHero().tagline}</p>
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <span className="font-semibold">{m.hero_status()}</span>
                        {location && (
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                                <MapPinIcon
                                    aria-hidden
                                    className="size-4"
                                />
                                {location}
                            </span>
                        )}
                    </p>
                </div>
                <HeroActions />
            </div>
        </SectionContainer>
    );
};
