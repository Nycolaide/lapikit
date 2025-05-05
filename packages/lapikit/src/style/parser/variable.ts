import type { Lapikit } from '$lib/internal/types.js';

export const variables = (config?: Lapikit) => {
	if (!config) return '';
	const { styles } = config;
	let css = ``;

	css += `:root {\n`;
	css += `\t--kit-spacing: ${parser(styles.spacing)};\n`;

	if (styles.corner.active) {
		for (const [key, value] of Object.entries(styles.corner.radius)) {
			css += `\t--kit-radius-${key}: ${typeof value === 'number' ? value + 'px' : value};\n`;
		}
	}

	for (const [key, value] of Object.entries(styles.font)) {
		css += `\t--kit-font-family-${key}: ${parser(value)};\n`;
	}

	css += `}\n`;

	return css;
};

const parser = (value: string | number | Array<string | number>) => {
	if (typeof value === 'number') return `${value}px`;
	if (Array.isArray(value)) return value.join(', ');
	return value;
};
