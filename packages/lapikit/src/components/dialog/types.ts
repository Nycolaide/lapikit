import type { Component } from '$lib/internal/types.js';

type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps extends Component {
	open?: boolean;
	classContent?: string | string[] | undefined;
	size?: DialogSize | { [key: string]: DialogSize };
	persistent?: boolean;
	closeWithEsc?: boolean;
	position?: 'bottom' | 'center' | 'top' | { [key: string]: 'bottom' | 'center' | 'top' };
	dark?: boolean;
	light?: boolean;
	color?: string;
	background?: string;
}
