import type { Component } from '$lib/internal/types.js';

export interface BtnProps extends Component {
	ref?: HTMLElement | null;
	is?: 'button' | 'a' | 'input';
}
