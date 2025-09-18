import type { Component } from '$lib/internal/types/index.js';
import type { Snippet } from 'svelte';

export type PositionElement = { x: number; y: number; location: string | null };

export interface PopoverProps extends Component {
	open?: boolean;
	dark?: boolean;
	light?: boolean;
	rounded?: string;
	position?: 'top' | 'bottom' | 'left' | 'right';
	color?: string;
	background?: string;
	activator?: Snippet<[ModelPopoverProps]>;
}

export type ModelPopoverProps = {
	toggle: (element: HTMLElement | null) => void;
};
