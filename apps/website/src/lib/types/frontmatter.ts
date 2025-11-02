import type { SvelteComponent } from 'svelte';

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
			category?: string;
			published?: boolean;
			recommended?: boolean;
			order?: number;
			status?: string;
		};
		github?: {
			url?: string;
		};
		keywords?: string[];
		[key: string]: unknown;
	} | null;
}

export interface Frontmatter {
	title: string;
	headings: { id: string; text: string; level: number }[];
}

export interface MarkdownModule {
	default: typeof SvelteComponent;
	metadata: Frontmatter;
}
