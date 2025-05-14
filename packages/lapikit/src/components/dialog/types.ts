import type { Component } from '$lib/internal/types.js';

type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type DialogPosition = 'bottom' | 'center' | 'top';
type DialogDensity = 'compact' | 'comfortable' | 'default';

export interface DialogProps extends Component {
	ref?: HTMLDialogElement;
	open?: boolean;
	classContent?: string | string[] | undefined;
	size?: DialogSize | { [key: string]: DialogSize };
	persistent?: boolean;
	position?: DialogPosition | { [key: string]: DialogPosition };
	dark?: boolean;
	light?: boolean;
	color?: string;
	background?: string;
	density?: DialogDensity | { [key: string]: DialogDensity };
}
