import type { Component } from '$lib/internal/types.js';

export interface ListProps extends Component {
	ref?: HTMLElement | null;
	is?: 'div' | 'nav';
	dark?: boolean;
	light?: boolean;
}

export interface ListItemProps extends Component {
	ref?: HTMLElement | null;
	is?: 'div' | 'nav';
	dark?: boolean;
	light?: boolean;
}
