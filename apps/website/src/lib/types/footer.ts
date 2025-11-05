export interface FooterNavigationItem {
	key: string;
	title: string;
	slug?: string;
	custom?: string;
	external?: boolean;
}

export interface FooterNavigationSection {
	title: string;
	items: FooterNavigationItem[] | Record<string, FooterNavigationItem>;
}

export interface FooterNavigation {
	[key: string]: FooterNavigationSection;
}

export interface SocialLink {
	name?: string;
	title?: string;
	icon: string;
	href: string;
	color: string;
	footer?: boolean;
}

export interface UrlInternal {
	discord: { invite: string };
	github: {
		repository: string;
		issues: string;
		edit_page: string;
		discussions: string;
		contributing: string;
		sponsors: string;
	};
	package: { licence: string };
	npm: { package: string };
	buymeacoffee: { [key: string]: unknown };
	social_network: { [key: string]: unknown };
	nycolaide: { website: string };
}

export interface FooterProps {
	url: UrlInternal;
	navigation: FooterNavigation;
	socials: SocialLink[];
	class?: string;
	[key: string]: unknown;
}
