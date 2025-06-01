import type { Snippet } from 'svelte';

export type SandboxProps = {
	presentation?: boolean;
	name: string;
	component?: Snippet;
	code?: string;
};

export type SandboxCodeProps = {
	code?: string;
	expanded?: string;
};

export type SandboxComponentProps = {
	children?: Snippet;
};

export type SandboxActionsProps = {
	expanded?: string;
	presentation?: boolean;
	tab?: string;
	handleTab: (key: string) => void;
	handleExpand: (key: string) => void;
};
