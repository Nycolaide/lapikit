import { deepMerge } from './internal/helpers/deep-merge.js';
import { breakpoints } from './stores/breakpoints.js';
import { get } from 'svelte/store';
import { devices } from './stores/devices.js';
import { valueToPx } from './internal/helpers/convert.js';

import type { LapikitConfiguration } from './internal/types/configuration.js';

function createLapikit(lapikit: LapikitConfiguration) {
	if (lapikit?.breakpoints?.thresholds) {
		const currentBreakpoints = get(breakpoints);
		const breakpointMerged = deepMerge(currentBreakpoints, lapikit.breakpoints.thresholds);
		const formattedBreakpoints = Object.fromEntries(
			Object.entries(breakpointMerged).map(([key, value]) => [key, valueToPx(value)])
		);

		breakpoints.set(formattedBreakpoints);
	}

	if (lapikit?.breakpoints?.devices) {
		const currentDevices = get(devices);
		const currentBreakpoints = get(breakpoints);
		const deviceMerged = deepMerge(currentDevices, lapikit.breakpoints.devices);
		const formattedDevices = Object.fromEntries(
			Object.entries(deviceMerged).map(([key, deviceKey]) => {
				const breakpointValue = currentBreakpoints[deviceKey];
				return [key, valueToPx(breakpointValue)];
			})
		);

		devices.set(formattedDevices);
	}
}

export default createLapikit;
