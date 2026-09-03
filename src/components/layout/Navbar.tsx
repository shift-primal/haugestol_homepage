import {
	EnvelopeIcon,
	GithubLogoIcon,
	HouseIcon,
	type Icon,
	InfoIcon,
	RocketIcon,
} from "@phosphor-icons/react";
import { Button } from "#/components/shadcn/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "#/components/shadcn/navigation-menu";
import { ThemeToggle } from "#/components/ui/ThemeToggle";

type Link = {
	label: string;
	icon: Icon;
	href: string;
};

const navLinks: Link[] = [
	{ label: "Home", icon: HouseIcon, href: "hero" },
	{
		label: "About",
		icon: InfoIcon,
		href: "about",
	},

	{
		label: "Projects",
		icon: RocketIcon,
		href: "projects",
	},
];

const contactLinks: Link[] = [
	{
		label: "GitHub",
		icon: GithubLogoIcon,
		href: "https://github.com/shift-primal",
	},
	{ label: "Email", icon: EnvelopeIcon, href: "mailto:kasper@haugestol.com" },
];

export const Navbar = () => {
	const scrollToSection = (href: string) => {
		document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<NavigationMenu className="flex-none shrink-0 w-full max-w-full h-min border-b-2 py-2 px-4 z-10 bg-background">
			<NavigationMenuList className="gap-2">
				{navLinks.map(({ label, icon: LinkIcon, href }) => (
					<NavigationMenuItem key={label}>
						<Button
							variant="ghost"
							className={navigationMenuTriggerStyle()}
							aria-label={label}
							onClick={() => scrollToSection(href)}
						>
							<LinkIcon />
						</Button>
					</NavigationMenuItem>
				))}

				<NavigationMenuItem className="ml-auto">
					<NavigationMenuTrigger>Kontakt</NavigationMenuTrigger>
					<NavigationMenuContent className="flex gap-2">
						{contactLinks.map(({ label, icon: LinkIcon, href }) => (
							<NavigationMenuLink
								key={label}
								aria-label={label}
								render={(props) => (
									<a href={href} target="_blank" rel="noreferrer" {...props}>
										<LinkIcon />
									</a>
								)}
							/>
						))}
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<ThemeToggle />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
