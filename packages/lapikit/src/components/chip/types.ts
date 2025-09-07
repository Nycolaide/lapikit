import type { Component } from '$lib/internal/types/index.js';
import type { Snippet } from 'svelte';

export interface ChipProps extends Component {
	load?: Snippet;
	close?: Snippet;
	append?: Snippet;
	prepend?: Snippet;
	ref?: HTMLElement | null;
	is?: 'button' | 'a' | 'span' | 'div';
	dark?: boolean;
	light?: boolean;
	href?: string;
	variant?: 'outline' | 'filled';
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
	type?: 'button';
	label?: string;
	closable?: boolean;
	noRipple?: boolean;
	readonly?: boolean;
}
