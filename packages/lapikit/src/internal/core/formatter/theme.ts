import { preset } from '$lib/internal/config/presets.js';
import { formatColor } from '$lib/internal/helpers/colors.js';
import { deepMerge } from '$lib/internal/helpers/deep-merge.js';
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

		let cssTheme =
			defaultTheme === name ? `:root,\n.kit-theme--${name} {\n` : `.kit-theme--${name} {\n`;

		function flattenColors(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
			const result: Record<string, string> = {};
			for (const [key, value] of Object.entries(obj)) {
				const newPrefix = prefix ? `${prefix}-${key}` : key;
				if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
					Object.assign(result, flattenColors(value as Record<string, unknown>, newPrefix));
				} else {
					result[newPrefix] = value as string;
				}
			}
			return result;
		}

		// colors
		cssTheme += `  color-scheme: ${values?.dark ? 'dark' : 'light'};\n`;
		const mergedColors = deepMerge(ref.colors, values?.colors) || {};
		const flatColors = flattenColors(mergedColors);
		for (const [varName, varValue] of Object.entries(flatColors)) {
			cssTheme += `  --kit-${varName}: ${formatColor(varValue)};\n`;
		}

		// variables
		for (const [name, varValue] of Object.entries(
			deepMerge(ref.variables, values?.variables) || {}
		)) {
			if (varValue && typeof varValue === 'object') {
				for (const [variableName, variableValue] of Object.entries(varValue || {})) {
					cssTheme += `  --kit-${name}-${variableName}: ${formatColor(parserValues(variableValue as string))};\n`;
				}
			} else {
				cssTheme += `  --kit-${name}: ${formatColor(parserValues(varValue))};\n`;
			}
		}
		css += cssTheme + '}\n';
	}

	return css;
}
