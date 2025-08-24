import { get } from 'svelte/store';
import { breakpoints } from '../stores/breakpoints.js';
import { viewportWidth } from '../stores/viewports.js';

// Converts rem/em/px to number of pixels
function toPx(value: string | number): number {
	if (typeof value === 'number') return value;
	if (typeof value === 'string') {
		if (value.endsWith('rem')) {
			return parseFloat(value) * 16;
		}
		if (value.endsWith('em')) {
			return parseFloat(value) * 16;
		}
		if (value.endsWith('px')) {
			return parseFloat(value);
		}
		return parseFloat(value);
	}
	return 0;
}

/**
 * Checks media queries according to breakpoints
 * @param {...Array<["min"|"max", string]>} args - ex: [ ["min", "xs"], ["max", "lg"] ]
 * @returns {boolean}
 */
export function mediaQueries(...args: Array<['min' | 'max', string]> | ['min' | 'max', string]) {
	const bp: Record<string, string | number> = get(breakpoints);
	const width = get(viewportWidth) || window.innerWidth;

	let queries: Array<['min' | 'max', string]> = [];
	if (Array.isArray(args[0]) && typeof args[0][0] === 'string') {
		queries = args as Array<['min' | 'max', string]>;
	} else if (typeof args[0] === 'string') {
		queries = [args as ['min' | 'max', string]];
	}

	let result = true;
	for (const [type, key] of queries) {
		const value = bp[key];
		const px = toPx(value);
		if (type === 'min') {
			result = result && width >= px;
		} else if (type === 'max') {
			result = result && width <= px;
		}
	}
	return result;
}
