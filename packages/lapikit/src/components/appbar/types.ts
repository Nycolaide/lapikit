import type { Component } from '$lib/internal/types.js';

type Density = 'compact' | 'comfortable' | 'default';

export interface AppbarProps extends Component {
	is?: 'div' | 'header' | 'nav';
	rounded?: string;
	density?: Density | { [key: string]: Density };
	dark?: boolean;
	light?: boolean;
	color?: string;
	background?: string;
	classContent?: string | string[] | undefined;
}
