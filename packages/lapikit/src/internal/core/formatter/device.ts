import { parserValues } from '$lib/internal/helpers/parser.js';

export async function devicesFormatter({
	devices
}: {
	devices: { [key: string]: number | string };
}) {
	let css: string = ``;

	const sortedDevices = Object.entries(devices).sort(([, a], [, b]) => {
		const valueA = typeof a === 'string' ? parseInt(a) : a;
		const valueB = typeof b === 'string' ? parseInt(b) : b;
		return valueB - valueA;
	});

	sortedDevices.forEach(([deviceName, breakpoint], index) => {
		const value = parserValues(breakpoint);

		css += `.${deviceName} {\n`;
		css += `  display: none;\n`;
		css += `}\n\n`;

		if (index === 0) {
			css += `@media (min-width: ${value}) {\n`;
			css += `  .${deviceName} {\n`;
			css += `    display: block;\n`;
			css += `  }\n`;
			css += `}\n\n`;
		} else if (index === sortedDevices.length - 1) {
			css += `@media (max-width: ${value}) {\n`;
			css += `  .${deviceName} {\n`;
			css += `    display: block;\n`;
			css += `  }\n`;
			css += `}\n\n`;
		} else {
			const nextDevice = sortedDevices[index + 1];
			const nextValue = parserValues(nextDevice[1]);

			css += `@media (min-width: ${nextValue}) and (max-width: ${value}) {\n`;
			css += `  .${deviceName} {\n`;
			css += `    display: block;\n`;
			css += `  }\n`;
			css += `}\n\n`;
		}

		css += `.hide-${deviceName} {\n`;
		css += `  display: block;\n`;
		css += `}\n\n`;

		if (index === 0) {
			css += `@media (min-width: ${value}) {\n`;
			css += `  .hide-${deviceName} {\n`;
			css += `    display: none;\n`;
			css += `  }\n`;
			css += `}\n\n`;
		} else if (index === sortedDevices.length - 1) {
			css += `@media (max-width: ${value}) {\n`;
			css += `  .hide-${deviceName} {\n`;
			css += `    display: none;\n`;
			css += `  }\n`;
			css += `}\n\n`;
		} else {
			const nextDevice = sortedDevices[index + 1];
			const nextValue = parserValues(nextDevice[1]);

			css += `@media (min-width: ${nextValue}) and (max-width: ${value}) {\n`;
			css += `  .hide-${deviceName} {\n`;
			css += `    display: none;\n`;
			css += `  }\n`;
			css += `}\n\n`;
		}
	});

	return css.trim();
}
