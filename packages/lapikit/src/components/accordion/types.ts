import type { Component } from '$lib/internal/types.js';
import type { Snippet } from 'svelte';

export interface AccordionProps extends Component {
	ref?: HTMLElement | null;
	is?: 'div';
	text?: string;
	dark?: boolean;
	light?: boolean;
	color?: string;
	background?: string;
	spacer?: boolean;
	hideIcon?: boolean;
}

export interface AccordionItemProps extends Component {
	index: number | string;
	indicator?: Snippet<[ModelAccordionItemProps]>;
	activator?: Snippet;
	ref?: HTMLElement | null;
	is?: 'div';
	text?: string;
	dark?: boolean;
	light?: boolean;
	rounded?: string;
	color?: string;
	background?: string;
	readOnly?: boolean;
	open?: boolean;
	disabled?: boolean;
	toggle?: (index: number | string) => void;
}

export type ModelAccordionItemProps = {
	open: boolean;
};
