// place files you want to import through the `$lib` alias in this folder.
export interface MarkdownPage {
	title: string;
	subtitle?: string | null;
	introduction?: string | null;
	slug?: string;
	style?: {
		icon?: string | null;
		cover?: string | null;
		color?: string | null;
	};
	state?: {
		section?: string;
		published?: boolean;
		order?: string | null;
		recommended?: boolean;
	};
	keywords?: string[] | null;
}

export interface MarkdownWithMetadata extends MarkdownPage {
	type?: 'match' | 'recommendation';
	metadata: {
		slug: string;
		date?: string;
		filename?: string;
	};
}

export interface MarkdownHead extends MarkdownPage {
	head: {
		title: string;
		description: string;
	};
}

export interface MarkdownHeadWithMetadata extends MarkdownHead {
	type?: 'match' | 'recommendation';
	metadata: {
		slug: string;
		date?: string;
		filename?: string;
	};
}

export interface SectionPages {
	key: string;
	icon?: string;
	submenu?: boolean;
	pages: MarkdownWithMetadata[];
}
