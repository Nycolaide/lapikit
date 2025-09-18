import type { Snippet } from 'svelte';

export type SandboxProps = {
	presentation?: boolean;
	name: string;
	component?: Snippet;
	code?: string;
};

export type SandboxCodeProps = {
	code?: string;
	expanded?: boolean;
};

export type SandboxComponentProps = {
	children?: Snippet;
};

export type SandboxActionsProps = {
	expanded?: boolean;
	presentation?: boolean;
	localColorScheme?: string;
	tab?: string;
	handleTab: (key: string) => void;
	handleExpand: (key: boolean) => void;
};
