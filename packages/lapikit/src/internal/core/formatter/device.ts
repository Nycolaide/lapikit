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

		if (index === 0) {
			// the largest device
			css += `@media (max-width: ${value}) {\n`;
			css += ` .kit-device--d-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;

			css += `@media (min-width: ${value}) {\n`;
			css += ` .kit-device--h-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;
		} else if (index === sortedDevices.length - 1) {
			const prevDevice = sortedDevices[index - 1];
			const prevValue = parserValues(prevDevice[1]);

			// the smallest device
			css += `@media (min-width: ${prevValue}) {\n`;
			css += ` .kit-device--d-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;

			css += `@media (max-width: ${prevValue}) {\n`;
			css += ` .kit-device--h-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;

			css += `@media (min-width: ${value}) {\n`;
			css += ` .kit-device--od-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;

			css += `@media (max-width: ${value}) {\n`;
			css += ` .kit-device--oh-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;
		} else {
			//intermediate devices
			const nextDevice = sortedDevices[index - 1];
			const nextValue = parserValues(nextDevice[1]);

			css += `@media (max-width: ${value}) {\n`;
			css += ` .kit-device--d-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;

			css += `@media (min-width: ${nextValue}) {\n`;
			css += ` .kit-device--h-${deviceName} {\n`;
			css += `   display: none !important;\n`;
			css += ` }\n`;
			css += `}\n\n`;

			// css += `@media (max-width: ${nextValue}) and (min-width: ${value}) {\n`;
			// css += ` .kit-device--d-${deviceName} {\n`;
			// css += `   display: none !important;\n`;
			// css += ` }\n`;
			// css += `}\n\n`;

			// css += `@media (min-width: ${nextValue}) and (max-width: ${value}) {\n`;
			// css += ` .kit-device--h-${deviceName} {\n`;
			// css += `   display: none !important;\n`;
			// css += ` }\n`;
			// css += `}\n\n`;
		}
	});

	console.log('DEVICE', css);
	return css.trim();
}
