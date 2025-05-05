import type { Lapikit } from '$lib/internal/types.js';

export const devices = (config: Lapikit) => {
	let css = ``;
	const list = {
		mobile: config.breakpoints.mobileBreakpoint,
		tablet: config.breakpoints.tabletBreakpoint,
		laptop: config.breakpoints.laptopBreakpoint
	};

	for (const [key, value] of Object.entries(list)) {
		const breakpointValue = config.breakpoints.thresholds[value];
		const breakpointValueMax =
			key !== 'laptop'
				? config.breakpoints.thresholds[
						key === 'mobile' ? list.tablet : key == 'tablet' ? list.laptop : ''
					]
				: undefined;

		css += `.device-${key}, .only-on-${key} {\n`;
		css += `display: none;\n`;
		css += `}\n`;

		css += `@media screen and (min-width: ${typeof breakpointValue === 'number' ? breakpointValue + 'px' : breakpointValue}) {\n`;
		css += `.device-${key} {\n`;
		css += `display: inherit !important;\n`;
		css += `}\n`;
		css += `}\n`;

		css += `@media screen and (min-width: ${typeof breakpointValue === 'number' ? breakpointValue + 'px' : breakpointValue}) ${breakpointValueMax ? `and (max-width: ${typeof breakpointValueMax === 'number' ? breakpointValueMax + 'px' : breakpointValueMax})` : ''}{\n`;
		css += `.only-on-${key} {\n`;
		css += `display: inherit !important;\n`;
		css += `}\n`;
		css += `}\n`;
	}

	return css;
};
