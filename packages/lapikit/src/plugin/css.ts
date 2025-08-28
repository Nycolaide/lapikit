import { deepMerge } from '$lib/internal/deepMerge.js';
import { preset } from './preset-v2.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function css(configuration: any) {
	// states
	const defaultTheme = configuration.theme.defaultTheme || preset.theme.defaultTheme;
	const themesMerged = deepMerge(configuration.theme.themes || {}, preset.theme.themes);

	for (const [name, values] of Object.entries(themesMerged)) {
		console.log(
			`Themes colors (${name}):`,
			values?.colors,
			values?.dark,
			defaultTheme === name ? 'is default' : 'other'
		);
	}
}
