import type { Component } from '$lib/internal/types/index.js';
import type { Snippet } from 'svelte';

export interface TextfieldProps extends Component {
	ref?: HTMLElement | null;
	dark?: boolean;
	light?: boolean;
	value?: string | number;
	type?: 'text' | 'email' | 'password' | 'number';
	placeholder?: string;
	counter?: boolean;
	min?: number;
	max?: number;
	variant?: 'outline' | 'text' | 'filled';
	density?: 'compact' | 'comfortable' | 'default';
	error?: boolean;
	errorMessage?: string;
	disabled?: boolean;
	color?: string;
	background?: string;
	size?: string | { [key: string]: string };
	readonly?: boolean;
	hideSpinButtons?: boolean;
	persistentMessage?: boolean;
	persistentClear?: boolean;
	clearable?: boolean;
	message?: string;
	messagePrefix?: string;
	messageSuffix?: string;
	append?: Snippet;
	prepend?: Snippet;
	prependInner?: Snippet;
	appendInner?: Snippet;
	prefix?: string;
	suffix?: string;
}
