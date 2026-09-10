import { LanguageSwitcher } from "#/components/ui/LanguageSwitcher";
import { LightSwitch } from "#/components/ui/LightSwitch";

export const Header = () => {
    return (
        <div className="flex justify-between px-16 mx-auto mt-8 lg:px-8 max-w-7xl w-full absolute inset-0">
            <LanguageSwitcher />
            <LightSwitch />
        </div>
    );
};
