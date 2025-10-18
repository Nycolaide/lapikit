import type { Snippet } from 'svelte';

export type SandboxProps = {
	presentation?: boolean;
	name: string;
	component?: Snippet;
	code?: string;
	noExpandedButton?: boolean;
	noCopy?: boolean;
	actions?: Snippet;
};

export type SandboxCodeProps = {
	code?: string;
	expanded?: boolean;
	noCopy?: boolean;
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
	noExpandedButton?: boolean;
	actions?: Snippet;
};
