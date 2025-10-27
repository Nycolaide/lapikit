export interface DocFile {
	path: string;
	slug: string;
	breadcrumbs: string[];
	metadata: {
		title?: string;
		subtitle?: string;
		description?: string;
		head?: {
			title?: string;
			description?: string;
		};
		style?: {
			icon?: string;
			cover?: string;
		};
		state?: {
			section?: string;
			published?: boolean;
			recommended?: boolean;
			order?: number;
		};
		github?: {
			url?: string;
		};
		keywords?: string[];
		[key: string]: unknown;
	} | null;
}

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
