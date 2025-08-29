import { deepMerge } from '$lib/internal/deepMerge.js';
import { preset } from './preset-v2.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fsPromises from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function css(configuration: any) {
	// states
	const defaultTheme = configuration?.theme?.defaultTheme || preset.theme.defaultTheme;
	const themesMerged = deepMerge(configuration?.theme?.themes || {}, preset.theme.themes);
	const variablesMerged = deepMerge(configuration?.theme?.variables || {}, preset.theme.variables);

	let response = '';
	for (const [name, values] of Object.entries(themesMerged)) {
		let css = '';

		css += defaultTheme === name ? `:root,\n.${name} {\n` : `.${name} {\n`;

		// colors
		css += `  color-scheme: ${values?.dark ? 'dark' : 'light'};\n`;
		for (const [varName, varValue] of Object.entries(values?.colors || {})) {
			css += `  --system-${varName}: ${varValue};\n`;
		}

		// variables
		for (const [name, varValue] of Object.entries(variablesMerged)) {
			css += `  --kit-${name}: ${varValue};\n`;
		}

		css += '}\n';

		console.log(`Themes colors (${name}):`, css);
		response += css;
	}

	console.log('All themes CSS:', response);

	// typography
	// states
	const defaultTypography =
		configuration?.typography?.defaultTypography || preset.typography.defaultTypography;
	const fontsMerged = deepMerge(configuration?.typography?.fonts || {}, preset.typography.fonts);

	for (const [name, values] of Object.entries(fontsMerged)) {
		let css = '';

		css += defaultTypography === name ? `:root,\n.${name} {\n` : `.${name} {\n`;
		// fonts
		for (const [fontName, fontValue] of Object.entries(values?.font || {})) {
			css += `  --kit-font-${fontName}: ${parser(fontValue)};\n`;
		}

		css += '}\n';

		response += css;
	}

	fsPromises.writeFile(path.resolve(__dirname, '../colors.css'), response);
}

const parser = (value: string | number | Array<string | number>) => {
	if (typeof value === 'number') return `${value}px`;
	if (Array.isArray(value)) return value.join(', ');
	return value;
};
