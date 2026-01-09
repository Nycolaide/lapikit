import type { Snippet } from 'svelte';

export interface ReplProps {
	title?: string;
	content?: string | Record<string, string | Record<string, unknown>>;
	children?: Snippet;
	presentation?: boolean;
}

export interface ToolbarProps {
	title?: string;
	language: string;
	copyState?: boolean;
	presentation?: boolean;
	viewState?: 'code' | 'preview';
	themeState?: 'light' | 'dark';
	modeState?: 'code' | 'playground' | 'mixed';
}

export interface FilesProps {
	files?: FileItem[];
	activeIndex: number;
	viewState: 'code' | 'preview';
	modeState: 'code' | 'playground' | 'mixed';
}

export interface FileItem {
	name: string;
	content: string;
	lang?: string;
}
