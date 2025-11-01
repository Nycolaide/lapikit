export interface StyleConfig {
	color?: string;
	icon?: string;
}

export interface DocumentStyle {
	icon?: string;
	cover?: string;
}

export interface DocumentHead {
	title?: string;
	description?: string;
}

export interface DocumentState {
	section?: string;
	category?: string;
	published?: boolean;
	recommended?: boolean;
	order?: number;
	status?: string;
}

export interface DocumentGitHub {
	url?: string;
}

export interface DocumentMetadata {
	title?: string;
	subtitle?: string;
	description?: string;
	head?: DocumentHead;
	style?: DocumentStyle;
	state?: DocumentState;
	github?: DocumentGitHub;
	keywords?: string[];
	[key: string]: unknown;
}

export interface DocFile {
	path: string;
	slug: string;
	breadcrumbs: string[];
	metadata: DocumentMetadata | null;
}

export interface NavDocsFile {
	path: string;
	slug: string;
	metadata: {
		title: string;
		subtitle?: string;
		description?: string;
		style?: DocumentStyle;
		state: {
			section: string;
			published?: boolean;
		};
		keywords?: string[];
	};
}

export interface NavigationCategory {
	key: string;
	title: string;
	order: number;
	style?: StyleConfig;
	items?: DocFile[];
}

export interface NavigationSection {
	key: string;
	title: string;
	order: number;
	slug: string;
	style?: StyleConfig;
	categories: NavigationCategory[];
}

export interface NavigationData {
	[key: string]: NavigationSection;
}

export interface CategoryConfig {
	key: string;
	title: string;
	style: StyleConfig;
}

export interface SectionConfig {
	key: string;
	title: string;
	order: number;
	slug: string;
	style: StyleConfig;
	categories: CategoryConfig[];
}

export type CategoryData = Record<string, SectionConfig>;

export interface RawDocsData {
	files: DocFile[];
}

export interface NavDocsStructure {
	generatedAt: string;
	totalFiles: number;
	files: NavDocsFile[];
}

export interface CategoryCounter {
	[category: string]: number;
}

export interface CounterData {
	generatedAt: string;
	totalElements: number;
	categories: CategoryCounter;
}

export interface SearchItem {
	slug: string;
	path: string;
	title: string;
	subtitle?: string;
	description?: string;
	section: string;
	style?: DocumentStyle;
	keywords?: string[];
}
