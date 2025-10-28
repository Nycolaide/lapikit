interface NavDocsFile {
	path: string;
	slug: string;
	metadata: {
		title: string;
		subtitle?: string;
		description?: string;
		style?: {
			icon?: string;
			cover?: string;
		};
		state: {
			section: string;
			published?: boolean;
		};
		keywords?: string[];
	};
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
	style?: {
		icon?: string;
		cover?: string;
	};
	keywords?: string[];
}
