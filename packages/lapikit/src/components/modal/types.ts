import type { Component } from '$lib/internal/types/index.js';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ModalPosition = 'bottom' | 'center' | 'top';
type ModalDensity = 'compact' | 'comfortable' | 'default';

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
	density?: ModalDensity | { [key: string]: ModalDensity };
	contain?: boolean;
	closeWithEsc?: boolean;
}
