import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface AppProps extends HTMLAttributes<HTMLDivElement> {
	ref?: HTMLDivElement;
	children?: Snippet;
	themes?: string | string[];
	storageKey?: string;
	light?: boolean;
	dark?: boolean;
}
