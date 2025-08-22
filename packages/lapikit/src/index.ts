import { deepMerge } from './internal/deepMerge.js';
import { breakpoints } from './stores/breakpoints.js';
import { get } from 'svelte/store';

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
		breakpoints.set(breakpointMerged);
		console.log('Breakpoints found:', breakpointMerged);
	}
}

export default createLapikit;
