import type { Component } from '$lib/internal/types.js';
import type { Snippet } from 'svelte';

export interface BtnProps extends Component {
	ref?: HTMLElement | null;
	is?: 'button' | 'a' | 'input';
	dark?: boolean;
	light?: boolean;
	href?: string;
	variant?: 'outline' | 'text';
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
	type?: 'button' | 'submit' | 'reset' | 'radio' | 'checkbox';
	label?: string;
	icon?: boolean;
	load?: Snippet;
}
