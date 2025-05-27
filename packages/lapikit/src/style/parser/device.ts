import type { Lapikit } from '$lib/internal/types.js';
import { setUnit } from '$lib/internal/unit.js';

export const devices = (config: Lapikit) => {
	let css = ``;
	const list = {
		mobile: config.breakpoints.mobileBreakpoint,
		tablet: config.breakpoints.tabletBreakpoint,
		laptop: config.breakpoints.laptopBreakpoint
	};

	css += `@media screen and (max-width: ${setUnit(config.breakpoints.thresholds[list.mobile])}) {\n`;
	css += `.hidden-mobile {\n`;
	css += `display: none !important;\n`;
	css += `}\n`;
	css += `}\n`;

	css += `@media screen and (min-width: ${setUnit(config.breakpoints.thresholds[list.mobile])}) {\n`;
	css += `.display-mobile {\n`;
	css += `display: none !important;\n`;
	css += `}\n`;
	css += `}\n`;

	css += `@media screen and (min-width: ${setUnit(config.breakpoints.thresholds[list.tablet])}) and (max-width: ${setUnit(config.breakpoints.thresholds[list.laptop])})  {\n`;
	css += `.hidden-tablet {\n`;
	css += `display: none !important;\n`;
	css += `}\n`;
	css += `}\n`;

	css += `@media screen and (max-width: ${setUnit(config.breakpoints.thresholds[list.tablet])}) and (min-width: ${setUnit(config.breakpoints.thresholds[list.laptop])}){\n`;
	css += `.display-tablet {\n`;
	css += `display: none !important;\n`;
	css += `}\n`;
	css += `}\n`;

	css += `@media screen and (min-width: ${setUnit(config.breakpoints.thresholds[list.laptop])})  {\n`;
	css += `.hidden-laptop {\n`;
	css += `display: none !important;\n`;
	css += `}\n`;
	css += `}\n`;

	css += `@media screen and (max-width: ${setUnit(config.breakpoints.thresholds[list.laptop])}) {\n`;
	css += `.display-laptop {\n`;
	css += `display: none !important;\n`;
	css += `}\n`;
	css += `}\n`;

	return css;
};
