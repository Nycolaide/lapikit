import { parseColor } from '$lib/internal/colors.js';
import type { Lapikit } from '$lib/internal/types.js';

export const colors = (config: Lapikit) => {
	const schemes: { [key: string]: { [key: string]: string } } = {
		light: {},
		dark: {}
	};

	for (const [property, values] of Object.entries(config.theme.colors)) {
		if (typeof values === 'string') {
			// for all color scheme
			const _refColor = parseColor(values);
			schemes['light'][property] = _refColor;
			schemes['dark'][property] = _refColor;
		} else {
			// with specification
			if ('light' in values && 'dark' in values) {
				schemes['light'][property] = parseColor(values.light);
				schemes['dark'][property] = parseColor(values.dark);
			} else {
				const _refColor =
					'dark' in values ? parseColor(values['dark']) : parseColor(values['light']);
				schemes['light'][property] = _refColor;
				schemes['dark'][property] = _refColor;
			}
		}
	}

	// css variables
	let cssVariables = '';

	if (config.theme.colorScheme === 'auto') {
		for (const [themeName, colors] of Object.entries(schemes)) {
			const used = themeName;
			const inversed = used === 'light' ? 'dark' : 'light';

			cssVariables += `@media (prefers-color-scheme: ${used}) {\n`;
			cssVariables += `:root, .${used} {\n`;
			cssVariables += `color-scheme: ${used};\n`;
			for (const [colorName, colorValue] of Object.entries(colors)) {
				cssVariables += `--kit-${colorName}: ${colorValue};\n`;
			}
			cssVariables += `}\n`;
			cssVariables += `.${inversed} {\n`;
			cssVariables += `color-scheme: ${used};\n`;
			for (const [colorName, colorValue] of Object.entries(schemes[inversed])) {
				cssVariables += `--kit-${colorName}: ${colorValue};\n`;
			}
			cssVariables += `}\n`;
			cssVariables += `}\n`;
		}
	} else {
		const used = config.theme.colorScheme;
		const inversed = config.theme.colorScheme === 'light' ? 'dark' : 'light';

		cssVariables += `:root, .${used} {\n`;
		cssVariables += `color-scheme: ${used};\n`;
		for (const [colorName, colorValue] of Object.entries(schemes[used])) {
			cssVariables += `--kit-${colorName}: ${colorValue};\n`;
		}
		cssVariables += `}\n`;

		cssVariables += `.${inversed} {\n`;
		cssVariables += `color-scheme: ${used};\n`;
		for (const [colorName, colorValue] of Object.entries(schemes[inversed])) {
			cssVariables += `--kit-${colorName}: ${colorValue};\n`;
		}
		cssVariables += `}\n`;
	}

	// class
	let classStyles = '';

	for (const [property] of Object.entries(schemes.light)) {
		classStyles += `.${property} {\n`;
		classStyles += `--background-color: var(--kit-${property});\n`;
		classStyles += `--color: var(--kit-${property});\n`;
		classStyles += `}\n`;
	}

	return {
		root: cssVariables,
		className: classStyles
	};
};
