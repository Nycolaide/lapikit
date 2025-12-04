export interface SitemapPage {
	url: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

export interface DocFileMetadata {
	title?: string;
	subtitle?: string;
	head?: {
		title?: string;
		description?: string;
	};
	state?: {
		section?: string;
		published?: boolean;
		recommended?: boolean;
		order?: number;
	};
}

export interface DocFile {
	path?: string;
	slug?: string;
	metadata?: DocFileMetadata;
}

export interface DocsData {
	generatedAt?: string;
	totalFiles?: number;
	files?: DocFile[];
}
