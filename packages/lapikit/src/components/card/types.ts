import type { Component } from '$lib/internal/types/index.js';

type Density = 'compact' | 'comfortable' | 'default';

export interface CardProps extends Component {
	is?: 'a' | 'button' | 'div';
	dark?: boolean;
	light?: boolean;
	href?: string;
	variant?: 'outline' | 'text' | 'filled';
	density?: Density | { [key: string]: Density };
	active?: boolean;
	disabled?: boolean;
	rounded?: string;
	color?: string;
	background?: string;
}
