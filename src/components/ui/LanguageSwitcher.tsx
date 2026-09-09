import { Label } from "#/components/shadcn/label";
import { Switch } from "#/components/shadcn/switch";
import { getLocale, locales, setLocale } from "#/paraglide/runtime";

const LOCALE_LABELS: Record<(typeof locales)[number], string> = {
	no: "NO",
	en: "EN",
};

export const LanguageSwitcher = () => {
	const activeLocale = getLocale();

	return (
		<div className="pointer-events-auto absolute top-10 left-1/8 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground/10 p-1 px-3 font-mono text-xs text-foreground/60">
			<Label htmlFor="locale-switch">{LOCALE_LABELS[locales[0]]}</Label>
			<Switch
				id="locale-switch"
				checked={activeLocale === locales[1]}
				onCheckedChange={(checked) =>
					setLocale(checked ? locales[1] : locales[0])
				}
			/>
			<Label htmlFor="locale-switch">{LOCALE_LABELS[locales[1]]}</Label>
		</div>
	);
};
