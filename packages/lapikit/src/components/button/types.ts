import type { Component } from '$lib/internal/types.js';
import type { Snippet } from 'svelte';

export interface ButtonProps extends Component {
	ref?: HTMLElement | null;
	is?: 'button' | 'a';
	dark?: boolean;
	light?: boolean;
	href?: string;
	variant?: 'outline' | 'text' | 'filled';
	density?: 'compact' | 'comfortable' | 'default';
	active?: boolean;
	loading?: boolean;
	error?: boolean;
	info?: boolean;
	warning?: boolean;
	success?: boolean;
	disabled?: boolean;
	color?: string;
	background?: string;
	size?: string | { [key: string]: string };
	type?: 'button' | 'submit' | 'reset';
	icon?: boolean;
	load?: Snippet;
	append?: Snippet;
	prepend?: Snippet;
	noRipple?: boolean;
}
