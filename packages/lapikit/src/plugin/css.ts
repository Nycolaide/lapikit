import { deepMerge } from '$lib/internal/deepMerge.js';
import { preset } from './preset-v2.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fsPromises from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function css(configuration: any) {
	console.log('VALUE configuration', configuration);
	console.log('configuration?.theme?.themes', configuration?.theme?.themes);
	// states
	const defaultTheme = configuration?.theme?.defaultTheme || preset.theme.defaultTheme;
	const themesMerged = deepMerge(preset.theme.themes, configuration?.theme?.themes || {});

	let response = '';

	console.log('VALUE themesMerged', themesMerged);

	for (const [name, values] of Object.entries(themesMerged)) {
		let css = defaultTheme === name ? `:root,\n.${name} {\n` : `.${name} {\n`;

		// ref
		const ref = values?.dark ? preset.theme.themes.dark : preset.theme.themes.light;
		// colors
		css += `  color-scheme: ${values?.dark ? 'dark' : 'light'};\n`;
		for (const [varName, varValue] of Object.entries(deepMerge(ref.colors, values?.colors) || {})) {
			css += `  --system-${varName}: ${varValue};\n`;
		}

		// console.log('VALUE', values, deepMerge(values?.variables, ref.variables));
		// variables
		for (const [name, varValue] of Object.entries(
			deepMerge(ref.variables, values?.variables) || {}
		)) {
			css += `  --kit-${name}: ${varValue};\n`;
		}

		css += '}\n';

		// console.log(`Themes colors (${name}):`, css);
		response += css;
	}

	// console.log('All themes CSS:', response);

	//typography
	// states
	const defaultTypography =
		configuration?.typography?.defaultTypography || preset.typography.defaultTypography;

	for (const [name, values] of Object.entries(
		deepMerge(preset.typography.fonts, configuration?.typography?.fonts || {})
	)) {
		let css = '';

		css += defaultTypography === name ? `:root {\n` : `.${name} {\n`;
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
