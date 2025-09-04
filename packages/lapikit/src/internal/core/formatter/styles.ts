import { parserValues } from '$lib/internal/helpers/parser.js';
import type { FragStyles } from '$lib/internal/types/configuration.js';

export async function stylesFormatter({ styles }: { styles: FragStyles }) {
	let css: string = `:root {\n`;
	for (const [name, values] of Object.entries(styles)) {
		if (values && typeof values === 'object') {
			for (const [styleName, styleValue] of Object.entries(values || {})) {
				css += `  --l-theme-${name}-${styleName}: ${parserValues(styleValue)};\n`;
			}
		} else {
			css += `  --l-theme-${name}: ${parserValues(values)};\n`;
		}
	}

	return (css += '}\n');
}
