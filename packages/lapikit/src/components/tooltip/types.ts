import type { Component } from '$lib/internal/types.js';
import type { Snippet } from 'svelte';

export interface TooltipProps extends Component {
	open?: boolean;
	dark?: boolean;
	light?: boolean;
	rounded?: string;
	label?: string;
	location?: 'top' | 'bottom' | 'left' | 'right';
	color?: string;
	background?: string;
	delayDuration?: number;
	variant?: 'arrow';
	density?: 'compact' | 'comfortable' | 'default';
	disabled?: boolean;
	avoidCollisions?: boolean;
	tooltip?: Snippet;
}

export type PositionElement = { x: number; y: number; location: string | null };
