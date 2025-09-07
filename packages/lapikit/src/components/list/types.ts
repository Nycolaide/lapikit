import type { Component } from '$lib/internal/types/index.js';
import type { Snippet } from 'svelte';

type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ListDensity = 'compact' | 'comfortable' | 'default';

export interface ListProps extends Component {
	ref?: HTMLElement | null;
	is?: 'div' | 'nav';
	dark?: boolean;
	light?: boolean;
	size?: ListSize | { [key: string]: ListSize };
	variant?: 'outline' | 'text' | 'filled';
	density?: ListDensity | { [key: string]: ListDensity };
	nav?: boolean;
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
	noRipple?: boolean;
}
