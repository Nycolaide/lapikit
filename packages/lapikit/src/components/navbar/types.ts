import type { Component } from '$lib/internal/types.js';

type Variant = 'outline' | 'text' | 'dash';
type Density = 'compact' | 'comfortable' | 'default';
type Orientation = 'horizontal' | 'vertical';
type Location = 'top' | 'bottom';

export interface NavbarProps extends Component {
	is?: 'div' | 'header' | 'nav';
	variant?: Variant | { [key: string]: Variant };
	rounded?: string;
	density?: Density | { [key: string]: Density };
	dark?: boolean;
	light?: boolean;
	color?: string;
	orientation?: Orientation | { [key: string]: Orientation };
	background?: string;
	location?: Location | { [key: string]: Location };
	classContent?: string | string[] | undefined;
}
