import { deepMerge } from './internal/deepMerge.js';
import { breakpoints } from './stores/breakpoints.js';
import { get } from 'svelte/store';
import { valueToPx } from './utils/convert.js';
import { devices } from './stores/devices.js';

interface Lapikit {
	adapterCSS: string;
	breakpoints: {
		devices: {
			[key: string]: string;
		};
		thresholds: {
			[key: string]: number | string;
		};
	};
	theme: {
		defaultTheme: string;
		themes: {
			[key: string]: {
				dark: boolean;
				colors: {
					[key: string]: string;
				};
				variables: {
					[key: string]: string;
				};
			};
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
		console.log('Devices found:', formattedDevices);
	}
}

export default createLapikit;
