import type { DocFile } from '$lib/types/frontmatter';

export interface CategoryWithPages {
	key: string;
	title: string;
	style: {
		color: string;
		icon: string;
	};
	slug: string;
	pages?: DocFile[];
}

export interface NavDocsData {
	generatedAt: string;
	totalFiles: number;
	files: DocFile[];
}

export interface NavigationLink {
	title: string;
	slug: string;
	sections?: NavigationData;
}

export interface NavigationSectionDirect {
	title: string;
	items: DocFile[];
}

export interface NavigationLinks {
	[key: string]: NavigationLink | NavigationSectionDirect;
}

export interface NavigationSection {
	key: string;
	path?: string;
	items: DocFile[];
}

export interface NavigationItem {
	title: string;
	path: string;
	badge?: string;
	order?: number;
}

export interface CategoryConfig {
	key: string;
	title: string;
	style?: {
		color?: string;
		icon?: string;
	};
}

export interface OrganizedSection {
	key: string;
	title: string;
	categories: Array<{
		key: string;
		title: string;
		style?: { color?: string; icon?: string };
		items: DocFile[];
	}>;
	uncategorizedItems: DocFile[];
}

export interface OrganizedDocs {
	orderedSections: OrganizedSection[];
}

export interface DisplayItem {
	type: 'category' | 'item';
	key?: string;
	title?: string;
	style?: { color?: string; icon?: string };
	items?: DocFile[];
	path?: string;
	slug?: string;
	breadcrumbs?: string[];
	metadata?: DocFile['metadata'];
	category?: string | null;
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
	navigation: NavigationData;
	class?: string;
	[key: string]: unknown;
}
