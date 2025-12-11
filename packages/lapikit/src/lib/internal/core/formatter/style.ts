import { parserValues } from '$lib/internal/helpers/parser.js';
import type { FragStyles } from '$lib/internal/types/configuration.js';

export async function stylesFormatter({ styles }: { styles: FragStyles }) {
	let css: string = `:root {\n`;
	for (const [name, values] of Object.entries(styles)) {
		if (values && typeof values === 'object') {
			for (const [styleName, styleValue] of Object.entries(values || {})) {
				css += `  --system-${name}-${styleName}: ${parserValues(styleValue)};\n`;
			}
		} else {
			css += `  --system-${name}: ${parserValues(values)};\n`;
		}
	}

	return (css += '}\n');
}
