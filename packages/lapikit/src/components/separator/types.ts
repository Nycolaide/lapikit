import type { Base } from '$lib/internal/types/index.js';

type Orientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends Base {
	is?: 'div' | 'hr';
	light?: boolean;
	dark?: boolean;
	inset?: boolean;
	thickness?: string;
	opacity?: string | number;
	color?: string;
	orientation?: Orientation | { [key: string]: Orientation };
}
