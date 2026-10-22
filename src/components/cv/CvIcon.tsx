import {
    CloudIcon,
    DatabaseIcon,
    EnvelopeSimpleIcon,
    FlaskIcon,
    GithubLogoIcon,
    GlobeIcon,
    GraduationCapIcon,
    HardDrivesIcon,
    type Icon,
    MapPinIcon,
    MonitorIcon,
    PhoneIcon,
    PlugIcon,
    WrenchIcon,
} from "@phosphor-icons/react";
import type { CvIcon as CvIconName } from "#/content";

const ICONS: Record<CvIconName, Icon> = {
    phone: PhoneIcon,
    mail: EnvelopeSimpleIcon,
    "map-pin": MapPinIcon,
    globe: GlobeIcon,
    github: GithubLogoIcon,
    school: GraduationCapIcon,
    monitor: MonitorIcon,
    server: HardDrivesIcon,
    database: DatabaseIcon,
    cloud: CloudIcon,
    plug: PlugIcon,
    "flask-conical": FlaskIcon,
    wrench: WrenchIcon,
};

export const CvIcon = ({
    name,
    className,
}: {
    name: CvIconName;
    className?: string;
}) => {
    const Component = ICONS[name];
    return (
        <Component
            aria-hidden
            weight="bold"
            className={className}
        />
    );
};
