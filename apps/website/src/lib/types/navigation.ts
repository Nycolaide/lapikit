import type { DocFile } from '$lib/types/frontmatter';

export interface NavigationLink {
	title: string;
	slug: string;
	sections?: NavigationData;
}

export interface NavigationSectionDirect {
	title: string;
	items: DocFile[];
}

export interface NavigationLinkWithSections extends NavigationLink {
	sections: NavigationData;
}

export interface NavigationLinks {
	[key: string]: NavigationLink | NavigationSectionDirect | NavigationLinkWithSections;
}

export interface NavigationSection {
	key: string;
	path?: string;
	items: DocFile[];
}

export interface UrlConfig {
	github: {
		repository: string;
		discussions: string;
	};
}

export interface NpmData {
	name?: string;
	version?: string;
	description?: string;
	homepage?: string;
	license?: string;
	repository?: string;
	lastPublished?: string;
	downloads?: number;
}

export interface NavigationSectionWithCategories {
	key: string;
	title: string;
	order: number;
	slug: string;
	style?: {
		color?: string;
		icon?: string;
	};
	categories: Array<{
		key: string;
		title: string;
		order: number;
		style?: {
			color?: string;
			icon?: string;
		};
		items?: DocFile[];
	}>;
}

export interface NavigationData {
	[key: string]: NavigationSectionWithCategories;
}

export interface DocNavProps {
	url: UrlConfig;
	npm?: NpmData;
	// navigation: NavigationData;
	class?: string;
	[key: string]: unknown;
}
