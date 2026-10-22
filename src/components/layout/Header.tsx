import { LanguageSwitcher } from "#/components/ui/LanguageSwitcher";
import { LightSwitch } from "#/components/ui/LightSwitch";

export const Header = () => {
    return (
        <header className="pointer-events-none z-20 print:hidden flex justify-between px-8 mx-auto mt-8 lg:px-8 max-w-7xl w-full absolute inset-0">
            <LanguageSwitcher />
            <LightSwitch />
        </header>
    );
};
