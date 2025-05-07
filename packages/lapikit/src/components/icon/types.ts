import type { Component } from '$lib/internal/types.js';

export interface IconProps extends Component {
	ref?: HTMLElement | null;
	is?: 'i' | 'div';
	dark?: boolean;
	light?: boolean;
	error?: boolean;
	info?: boolean;
	warning?: boolean;
	success?: boolean;
	disabled?: boolean;
	color?: string;
	size?: string | { [key: string]: string };
}
