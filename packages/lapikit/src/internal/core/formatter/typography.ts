import { parserValues } from '$lib/internal/helpers/parser.js';
import type { FragTypography } from '$lib/internal/types/configuration.js';

export function typographyFormatter({
	typography,
	defaultTypography = 'default'
}: {
	typography: FragTypography;
	defaultTypography: string;
}) {
	let css: string = '';
	for (const [name, values] of Object.entries(typography)) {
		let cssTypo = defaultTypography === name ? `:root {\n` : `.${name} {\n`;
		for (const [fontName, fontValue] of Object.entries(values || {})) {
			cssTypo += `  --kit-font-${fontName}: ${parserValues(fontValue)};\n`;
		}
		css += cssTypo + '}\n';
	}

	return css;
}
