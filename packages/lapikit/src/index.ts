import { deepMerge } from './internal/deepMerge.js';
import { breakpoints } from './stores/breakpoints.js';
import { get } from 'svelte/store';
import { valueToPx } from './utils/convert.js';

interface Lapikit {
	adapterCSS: string;
	breakpoints: {
		thresholds: {
			[key: string]: number | string;
		};
	};
}

function createLapikit(lapikit: Lapikit) {
	console.log('Creating a new Lapikit instance...');
	console.log('Options loaded:', lapikit);

	if (lapikit?.breakpoints?.thresholds) {
		const currentBreakpoints = get(breakpoints);
		const breakpointMerged = deepMerge(currentBreakpoints, lapikit.breakpoints.thresholds);
		const formattedBreakpoints = Object.fromEntries(
			Object.entries(breakpointMerged).map(([key, value]) => [key, valueToPx(value)])
		);

		breakpoints.set(formattedBreakpoints);
		console.log('Breakpoints found:', formattedBreakpoints);
	}
}

export default createLapikit;
