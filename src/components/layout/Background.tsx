import MetaBalls from "#/components/shadcn/metaballs.tsx";

export const Background = ({ theme }: { theme: string | undefined }) => (
    <div className="fixed inset-0 -z-10 pointer-events-none">
        <MetaBalls
            color={theme === "dark" ? "#fafafa" : "#CB5E26"}
            cursorBallColor="#FF712F"
            cursorBallSize={1.5}
            variant="contour"
            motion="lava"
            ballCount={12}
            animationSize={20}
            gooeyness={0.7}
            stretch={0.2}
            wobble={0}
            enableTransparency
            speed={0.05}
            clumpFactor={2}
            hoverSmoothness={0.03}
            stickiness={0.5}
            lineWidth={1.5}
            rings={4}
            fade={0.85}
            enableMouseInteraction={true}
            clickBurst
            returnOnLeave={false}
            intro={false}
        />
    </div>
);
