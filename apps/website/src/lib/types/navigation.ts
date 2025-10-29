import type { DocFile } from '$lib/types/frontmatter';

export interface NavDocsData {
	generatedAt: string;
	totalFiles: number;
	files: DocFile[];
}

export interface NavigationLink {
	title: string;
	slug: string;
	sections?: NavigationSection[];
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
