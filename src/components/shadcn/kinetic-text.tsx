import type React from "react";

import { cn } from "#/lib/shadcn.utils";

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
    text: string;
    as?: As;
};

export function KineticText({
    text,
    as: Tag = "h1",
    className = "",
    style,
    ...rest
}: KineticTextProps) {
    const mergedStyle = {
        "--hover-padding": "calc(1em / 12)",
        "--text-stroke-width": "calc(1em * 125 / 6000)",
        ...(style as React.CSSProperties | undefined),
    } as React.CSSProperties;

    return (
        <Tag
            {...rest}
            aria-label={text}
            className={cn("flex flex-wrap font-semibold", className)}
            style={mergedStyle}
        >
            {text.split("").map((letter, i) => (
                <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: <has-no-stable-id>
                    key={i}
                    aria-hidden="true"
                    className="[-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] motion-safe:will-change-[font-weight,-webkit-text-stroke-width,padding] motion-safe:transition-[font-weight,color,-webkit-text-stroke-color,padding] motion-safe:duration-slow motion-safe:hover:px-(--hover-padding) motion-safe:hover:font-extrabold motion-safe:hover:text-primary motion-safe:hover:[-webkit-text-stroke-color:currentcolor] motion-safe:hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] motion-safe:has-[+span+span:hover]:font-medium motion-safe:has-[+span:hover]:px-(--hover-padding) motion-safe:has-[+span:hover]:font-bold motion-safe:[:hover+&]:px-(--hover-padding) motion-safe:[:hover+&]:font-bold motion-safe:[:hover+span+&]:font-medium pointer-events-auto"
                >
                    {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
        </Tag>
    );
}
