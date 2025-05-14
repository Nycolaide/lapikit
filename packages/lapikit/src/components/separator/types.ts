import type { Base } from '$lib/internal/types.js';

export interface SeparatorProps extends Base {
	is?: 'div' | 'hr';
	light?: boolean;
	dark?: boolean;
	inset?: boolean;
	thickness?: string;
	opacity?: string | number;
	color?: string;
	orientation?: 'horizontal' | 'vertical';
}
