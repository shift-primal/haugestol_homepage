import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";
import { Button } from "#/components/shadcn/button.tsx";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    scrollTo: (index: number) => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    selectedIndex: number;
    slideCount: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }

    return context;
}

function Carousel({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins
    );
    // reduced motion: jump straight to a slide instead of animating there
    const jump = useMediaQuery("(prefers-reduced-motion: reduce)");
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [slideCount, setSlideCount] = React.useState(0);

    const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) return;
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
        setSelectedIndex(api.selectedScrollSnap());
        setSlideCount(api.scrollSnapList().length);
    }, []);

    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev(jump);
    }, [
        api,
        jump,
    ]);

    const scrollNext = React.useCallback(() => {
        api?.scrollNext(jump);
    }, [
        api,
        jump,
    ]);

    const scrollTo = React.useCallback(
        (index: number) => {
            api?.scrollTo(index, jump);
        },
        [
            api,
            jump,
        ]
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        },
        [
            scrollPrev,
            scrollNext,
        ]
    );

    React.useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [
        api,
        setApi,
    ]);

    React.useEffect(() => {
        if (!api) return;
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        return () => {
            api?.off("select", onSelect);
            api?.off("reInit", onSelect);
        };
    }, [
        api,
        onSelect,
    ]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                opts,
                orientation:
                    orientation ||
                    (opts?.axis === "y" ? "vertical" : "horizontal"),
                scrollPrev,
                scrollNext,
                scrollTo,
                canScrollPrev,
                canScrollNext,
                selectedIndex,
                slideCount,
            }}
        >
            {/** biome-ignore lint/a11y/useSemanticElements: <not-my-code> */}
            <div
                onKeyDownCapture={handleKeyDown}
                className={cn("relative", className)}
                role="region"
                aria-roledescription="carousel"
                data-slot="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div
            ref={carouselRef}
            className="overflow-hidden"
            data-slot="carousel-content"
        >
            <div
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                    className
                )}
                {...props}
            />
        </div>
    );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
    const { orientation } = useCarousel();

    return (
        // biome-ignore lint/a11y/useSemanticElements: <not-my-code>
        <div
            role="group"
            aria-roledescription="slide"
            data-slot="carousel-item"
            className={cn(
                "min-w-0 shrink-0 grow-0 basis-full",
                orientation === "horizontal" ? "pl-4" : "pt-4",
                className
            )}
            {...props}
        />
    );
}

function CarouselPrevious({
    className,
    variant = "outline",
    size = "icon-sm",
    ...props
}: React.ComponentProps<typeof Button>) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <Button
            data-slot="carousel-previous"
            variant={variant}
            size={size}
            className={cn(
                "touch-manipulation",
                orientation === "horizontal"
                    ? "inset-y-0 -left-12 my-auto"
                    : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            disabled={!canScrollPrev}
            suppressHydrationWarning
            onClick={scrollPrev}
            {...props}
        >
            <CaretLeftIcon />
            <span className="sr-only">{m.carousel_previous()}</span>
        </Button>
    );
}

function CarouselNext({
    className,
    variant = "outline",
    size = "icon-sm",
    ...props
}: React.ComponentProps<typeof Button>) {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
        <Button
            data-slot="carousel-next"
            variant={variant}
            size={size}
            className={cn(
                "touch-manipulation",
                orientation === "horizontal"
                    ? "inset-y-0 -right-12 my-auto"
                    : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                className
            )}
            disabled={!canScrollNext}
            suppressHydrationWarning
            onClick={scrollNext}
            {...props}
        >
            <CaretRightIcon />
            <span className="sr-only">{m.carousel_next()}</span>
        </Button>
    );
}

// Position dots: the touch-friendly alternative to the arrow buttons. The
// visible dot is small; each button keeps a finger-sized hit area.
function CarouselDots({ className }: { className?: string }) {
    const { scrollTo, selectedIndex, slideCount } = useCarousel();
    if (slideCount < 2) return null;

    return (
        <div
            data-slot="carousel-dots"
            className={cn("flex justify-center", className)}
        >
            {Array.from(
                {
                    length: slideCount,
                },
                (_, index) => (
                    <button
                        // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional
                        key={index}
                        type="button"
                        aria-label={m.carousel_go_to({
                            n: index + 1,
                        })}
                        aria-current={index === selectedIndex}
                        onClick={() => scrollTo(index)}
                        className="group/dot flex size-6 items-center justify-center outline-none focus-ring pointer-coarse:size-11"
                    >
                        <span
                            className={cn(
                                "block size-1.5 rounded-full transition-colors duration-base",
                                index === selectedIndex
                                    ? "bg-foreground"
                                    : "bg-foreground/25 group-hover/dot:bg-foreground/50"
                            )}
                        />
                    </button>
                )
            )}
        </div>
    );
}

// "2 / 5", announced politely as the slide changes
function CarouselCounter({ className }: { className?: string }) {
    const { selectedIndex, slideCount } = useCarousel();
    if (slideCount < 2) return null;

    return (
        <p
            aria-live="polite"
            className={cn("font-mono text-xs tabular-nums", className)}
        >
            <span aria-hidden>
                {selectedIndex + 1} / {slideCount}
            </span>
            <span className="sr-only">
                {m.carousel_position({
                    current: selectedIndex + 1,
                    total: slideCount,
                })}
            </span>
        </p>
    );
}

export {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselCounter,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel,
};
