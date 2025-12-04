import type { FooterNavigation, SocialLink } from './footer';
import type { NavigationLinks } from './navigation';

export interface ComponentPropsBase {
	class?: string;
	[key: string]: unknown;
}

export interface FooterComponentProps extends ComponentPropsBase {
	url: string;
	navigation: FooterNavigation;
	socials: SocialLink[];
}

export interface BreadcrumbsComponentProps extends ComponentPropsBase {
	url: string;
}

import type { SvelteComponent } from 'svelte';

export interface DocPageData {
	nav_links: NavigationLinks;
	page: {
		content: typeof SvelteComponent;
		meta: {
			head?: {
				title?: string;
				description?: string;
			};
		};
	};
}
