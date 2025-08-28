import { deepMerge } from '$lib/internal/deepMerge.js';
import { preset } from './preset-v2.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function css(configuration: any) {
	// states
	const defaultTheme = configuration?.theme?.defaultTheme || preset.theme.defaultTheme;
	const themesMerged = deepMerge(configuration?.theme?.themes || {}, preset.theme.themes);
	const variablesMerged = deepMerge(configuration?.theme?.variables || {}, preset.theme.variables);

	let response = '';
	for (const [name, values] of Object.entries(themesMerged)) {
		let css = '';

		css += defaultTheme === name ? ':root {\n' : `.${name} {\n`;
		css += `  color-scheme: ${values?.dark ? 'dark' : 'light'};\n`;
		for (const [varName, varValue] of Object.entries(values?.colors || {})) {
			css += `  --system-${varName}: ${varValue};\n`;
		}
		css += '}\n';

		console.log(`Themes colors (${name}):`, css);
		response += css;
	}

	//variables
	response += ':root {\n';
	for (const [name, varValue] of Object.entries(variablesMerged)) {
		response += `  --kit-${name}: ${varValue};\n`;
	}
	response += '}\n';

	console.log('All themes CSS:', response);
}
