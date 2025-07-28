import type { Base } from '$lib/internal/types.js';

export interface TextfieldProps extends Base {
	is?: 'div';
	value?: string | number;
	type?: 'text' | 'email' | 'password' | 'number';
	placeholder?: string;
	counter?: boolean;
	min?: number;
	max?: number;
}
