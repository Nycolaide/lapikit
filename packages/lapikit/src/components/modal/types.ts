import type { Component } from '$lib/internal/types.js';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ModalPosition = 'bottom' | 'center' | 'top';

export interface ModalProps extends Component {
	ref?: HTMLDivElement;
	open?: boolean;
	classContent?: string | string[] | undefined;
	size?: ModalSize | { [key: string]: ModalSize };
	persistent?: boolean;
	position?: ModalPosition | { [key: string]: ModalPosition };
	dark?: boolean;
	light?: boolean;
	color?: string;
	background?: string;
	density?: 'compact' | 'comfortable' | 'default';
}
