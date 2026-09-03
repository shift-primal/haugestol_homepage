import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "#/components/shadcn/animated-theme-toggler";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	// resolvedTheme is undefined during SSR and resolves synchronously on the
	// client's first render, so rendering off it before mount would mismatch
	// the server-rendered icon.
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return (
		<div className="flex justify-center p-6">
			<AnimatedThemeToggler
				theme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
				onThemeChange={setTheme}
			/>
		</div>
	);
}
