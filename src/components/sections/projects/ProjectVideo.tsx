import { useEffect, useRef } from "react";
import type { Recording } from "#/content";
import { useMediaQuery } from "#/hooks/useMediaQuery";
import { cn } from "#/lib/shadcn.utils";
import { m } from "#/paraglide/messages";

export const ProjectVideo = ({
    recording,
    title,
    controls = false,
    className,
}: {
    recording: Recording;
    title: string;
    controls?: boolean;
    className?: string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    // Played from an effect rather than autoPlay so reduced motion is respected
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (reducedMotion) {
            video.pause();
        } else {
            video.play().catch(() => {});
        }
    }, [
        reducedMotion,
    ]);

    return (
        <div className={cn("overflow-clip", className)}>
            <video
                ref={videoRef}
                aria-label={m.project_recording_label({
                    title,
                })}
                muted
                loop
                playsInline
                preload="metadata"
                controls={controls}
                width={1920}
                height={1080}
                className="relative z-20 aspect-video h-auto w-full object-cover scale-101"
            >
                <source
                    src={`${recording.webm}#t=0.1`}
                    type="video/webm"
                />
                <source
                    src={`${recording.mp4}#t=0.1`}
                    type="video/mp4"
                />
            </video>
        </div>
    );
};
