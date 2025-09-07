import type { Component } from '$lib/internal/types/index.js';
import type { Snippet } from 'svelte';

type AlertDensity = 'compact' | 'comfortable' | 'default';
type AlertVariant = 'outline' | 'dash' | 'text';

export interface AlertProps extends Component {
	append?: Snippet;
	prepend?: Snippet;
	close?: Snippet;
	href?: string;
	is?: 'div';
	dark?: boolean;
	light?: boolean;
	variant?: AlertVariant | { [key: string]: AlertVariant };
	density?: AlertDensity | { [key: string]: AlertDensity };
	rounded?: string;
	closable?: boolean;
	color?: string;
	background?: string;
	warning?: boolean;
	info?: boolean;
	success?: boolean;
	error?: boolean;
}
