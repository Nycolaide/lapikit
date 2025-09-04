import { preset } from '$lib/internal/config/presets.js';
import { deepMerge } from '$lib/internal/deepMerge.js';
import { parserValues } from '$lib/internal/helpers/parser.js';
import type { FragThemes } from '$lib/internal/types/index.js';

export async function themesFormatter({
	themes,
	defaultTheme = 'light'
}: {
	themes: FragThemes;
	defaultTheme: string;
}) {
	let css: string = '';

	for (const [name, values] of Object.entries(themes)) {
		const ref = values?.dark ? preset.theme.themes.dark : preset.theme.themes.light;
		let cssTheme = defaultTheme === name ? `:root,\n.${name} {\n` : `.${name} {\n`;

		// colors
		cssTheme += `  color-scheme: ${values?.dark ? 'dark' : 'light'};\n`;
		for (const [varName, varValue] of Object.entries(deepMerge(ref.colors, values?.colors) || {})) {
			cssTheme += `  --system-${varName}: ${varValue};\n`;
		}

		// variables
		for (const [name, varValue] of Object.entries(
			deepMerge(ref.variables, values?.variables) || {}
		)) {
			if (varValue && typeof varValue === 'object') {
				for (const [variableName, variableValue] of Object.entries(varValue || {})) {
					cssTheme += `  --kit-${name}-${variableName}: ${parserValues(variableValue)};\n`;
				}
			} else {
				cssTheme += `  --kit-${name}: ${parserValues(varValue)};\n`;
			}
		}

		css += cssTheme + '}\n';
	}

	return css;
}
