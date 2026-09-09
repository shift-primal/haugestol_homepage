import { getLocale, locales, setLocale } from "#/paraglide/runtime";

const LOCALE_LABELS: Record<(typeof locales)[number], string> = {
	no: "NO",
	en: "EN",
};

export const LanguageSwitcher = () => {
	const activeLocale = getLocale();

	return (
		<div className="pointer-events-auto fixed top-10 left-1/8 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-foreground/10 p-1 font-mono text-xs text-foreground/60">
			{locales.map((locale) => (
				<button
					key={locale}
					type="button"
					onClick={() => setLocale(locale)}
					aria-pressed={locale === activeLocale}
					className="rounded-full px-2 py-1 outline-none transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 aria-pressed:bg-foreground/20 aria-pressed:text-foreground"
				>
					{LOCALE_LABELS[locale]}
				</button>
			))}
		</div>
	);
};
