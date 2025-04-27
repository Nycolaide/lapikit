import { parseColor } from './colors.js';

const colorsList: {
	[key: string]: { light: string; dark: string } | string;
} = {
	primary: { light: 'oklch(45% 0.24 277.023)', dark: 'oklch(45% 0.24 277.023)' },
	secondary: { light: 'oklch(65% 0.241 354.308)', dark: 'oklch(65% 0.241 354.308)' },
	tertiary: { light: 'oklch(77% 0.152 181.912)', dark: 'oklch(77% 0.152 181.912)' },
	neutral: { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
	info: { light: 'oklch(74% 0.16 232.661)', dark: 'oklch(74% 0.16 232.661)' },
	success: { light: 'oklch(76% 0.177 163.223)', dark: 'oklch(76% 0.177 163.223)' },
	warning: { light: 'oklch(82% 0.189 84.429)', dark: 'oklch(82% 0.189 84.429)' },
	error: { light: 'oklch(71% 0.194 13.428)', dark: 'oklch(71% 0.194 13.428)' },
	base: { light: 'oklch(100% 0 0)', dark: 'oklch(25.33% 0.016 252.42)' },
	surface: { light: 'oklch(98% 0 0)', dark: 'oklch(23.26% 0.014 253.1)' },
	container: { light: 'oklch(95% 0 0)', dark: 'oklch(21.15% 0.012 254.09)' },
	shadow: 'black',
	hexa: '#c1ec75',
	rgb: 'rgb(238, 19, 121)',
	rgba: 'rgba(19, 34, 238, 0.5)',
	oklch: 'oklch(45% 0.24 277.023)'
};

export const colors = () => {
	const schemes: { [key: string]: { [key: string]: string } } = {
		light: {},
		dark: {}
	};

	for (const [property, values] of Object.entries(colorsList)) {
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

	const theming: 'light' | 'dark' | 'mixed' = 'mixed';

	// css variables
	let cssVariables = '';

	if (theming === 'mixed') {
		for (const [themeName, colors] of Object.entries(schemes)) {
			const used = themeName;
			const inversed = used === 'light' ? 'dark' : 'light';

			cssVariables += `@media (prefers-color-scheme: ${used}) {\n`;
			cssVariables += `:root, .${used} {\n`;
			cssVariables += `color-scheme: ${used};\n`;
			for (const [colorName, colorValue] of Object.entries(colors)) {
				cssVariables += `--${colorName}: ${colorValue};\n`;
			}
			cssVariables += `}\n`;
			cssVariables += `.${inversed} {\n`;
			cssVariables += `color-scheme: ${used};\n`;
			for (const [colorName, colorValue] of Object.entries(schemes[inversed])) {
				cssVariables += `--${colorName}: ${colorValue};\n`;
			}
			cssVariables += `}\n`;
			cssVariables += `}\n`;
		}
	} else {
		const used = theming;
		const inversed = theming === 'light' ? 'dark' : 'light';

		cssVariables += `:root, .${used} {\n`;
		for (const [colorName, colorValue] of Object.entries(schemes[used])) {
			cssVariables += `--${colorName}: ${colorValue};\n`;
		}
		cssVariables += `}\n`;

		cssVariables += `.${inversed} {\n`;
		for (const [colorName, colorValue] of Object.entries(schemes[inversed])) {
			cssVariables += `--${colorName}: ${colorValue};\n`;
		}
		cssVariables += `}\n`;
	}

	// class
	let classStyles = '';

	for (const [property] of Object.entries(schemes.light)) {
		classStyles += `.${property} {\n`;
		classStyles += `--background-color: var(--${property});\n`;
		classStyles += `--color: var(--${property});\n`;
		classStyles += `}\n`;
	}

	return {
		root: cssVariables,
		className: classStyles
	};
};
