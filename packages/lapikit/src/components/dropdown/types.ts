import type { Component } from '$lib/internal/types.js';
import type { Snippet } from 'svelte';

export type PositionElement = { x: number; y: number; location: string | null };

export interface DropdownProps extends Component {
	dark?: boolean;
	light?: boolean;
	rounded?: string;
	position?: 'top' | 'bottom' | 'left' | 'right';
	openOnHover?: boolean;
	closeOnClick?: boolean;
	color?: string;
	background?: string;
	activator?: Snippet<
		[
			ModelDropdownProps,
			(state: 'open' | 'close', element: HTMLElement | PointerEvent | null) => void
		]
	>;
}

export type ModelDropdownProps = {
	open: boolean;
	close: () => void;
	toggle: (element: HTMLElement | PointerEvent | null) => void;
};
