export interface FrontMatterData {
	title?: string;
	subtitle?: string;
	description?: string;
	head?: {
		title?: string;
		description?: string;
	};
	style?: {
		icon?: string;
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
}

export interface ManifestEntry {
	path: string;
	slug: string;
	breadcrumbs: string[];
	metadata: FrontMatterData | null;
}

export interface Manifest {
	generatedAt: string;
	totalFiles: number;
	files: ManifestEntry[];
}
