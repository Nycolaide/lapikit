import type { Component } from '$lib/internal/types.js';
import type { Snippet } from 'svelte';

type ListOrientation = 'vertical' | 'horizontal';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ListDensity = 'compact' | 'comfortable' | 'default';

export interface ListProps extends Component {
	ref?: HTMLElement | null;
	is?: 'div' | 'nav';
	dark?: boolean;
	light?: boolean;
	size?: ListSize | { [key: string]: ListSize };
	variant?: 'outline' | 'text' | 'dash' | 'link';
	density?: ListDensity | { [key: string]: ListDensity };
	nav?: boolean;
	orientation?: ListOrientation | { [key: string]: ListOrientation };
}

export interface ListItemProps extends Component {
	ref?: HTMLElement | null;
	is?: 'div' | 'a' | 'button';
	href?: string;
	dark?: boolean;
	light?: boolean;
	append?: Snippet;
	prepend?: Snippet;
	color?: string;
	background?: string;
	active?: boolean;
	disabled?: boolean;
}
