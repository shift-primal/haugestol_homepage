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
            <div className="flex flex-col justify-center gap-8">
                <HeroIntro />
                <div className="flex max-w-xl flex-col gap-4 pointer-events-auto">
                    <p className="text-lg leading-relaxed text-pretty text-foreground/80 sm:text-xl">
                        {getHero().tagline}
                    </p>
                    <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <span className="inline-flex items-start gap-2.5 font-semibold">
                            <span
                                aria-hidden
                                className="relative mt-1.75 flex size-2.5 shrink-0"
                            >
                                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60 animation-duration-[2.4s] motion-reduce:animate-none" />
                                <span className="relative size-2.5 rounded-full bg-primary" />
                            </span>
                            {m.hero_status()}
                        </span>
                        {location && (
                            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
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
