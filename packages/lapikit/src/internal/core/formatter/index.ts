import { preset } from '$lib/internal/config/presets.js';
import { deepMerge } from '$lib/internal/deepMerge.js';
import type { DevConfiguration } from '$lib/internal/types/index.js';
import { componentFormatter } from './component.js';
import { themesFormatter } from './theme.js';
import { typographyFormatter } from './typography.js';

export async function css(
	config: DevConfiguration
): Promise<{ themes: string; typography: string }> {
	// states
	const defaultTheme = config?.theme?.defaultTheme || preset.theme.defaultTheme;
	const defaultTypography =
		config?.typography?.defaultTypography || preset.typography.defaultTypography;

	// formatter
	const themes = await themesFormatter({
		themes: deepMerge(preset.theme.themes, config?.theme?.themes || {}),
		defaultTheme
	});

	const typography = await typographyFormatter({
		typography: deepMerge(preset.typography.fonts, config?.typography?.fonts || {}),
		defaultTypography
	});

	// components
	await componentFormatter({
		breakpoints: deepMerge(preset.breakpoints.thresholds, config?.breakpoints?.thresholds || {})
	});

	return {
		themes: themes,
		typography: typography
	};
}
