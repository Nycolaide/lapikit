import type { Colors, FontFamily, LapikitConfig, Radius, Thresholds } from '$lib/internal/types.js';
import { config } from '$lib/preset.js';

export const parseConfig = (props?: LapikitConfig) => {
	if (!props) return config;
	const newConfig = { ...config };

	if (props?.options) {
		if (props.options.normalize !== undefined)
			newConfig.options.normalize = props.options.normalize;
		if (props.options.minify !== undefined) newConfig.options.minify = props.options.minify;
	}

	if (props?.theme) {
		if (props.theme.colorScheme !== undefined)
			newConfig.theme.colorScheme = props.theme.colorScheme;
		if (props.theme.colors) {
			newConfig.theme.colors = {
				...newConfig.theme.colors,
				...props.theme.colors
			} as Colors;
		}
	}
	if (props?.breakpoints) {
		if (props.breakpoints.mobileBreakpoint !== undefined)
			newConfig.breakpoints.mobileBreakpoint = props.breakpoints.mobileBreakpoint;
		if (props.breakpoints.tabletBreakpoint !== undefined)
			newConfig.breakpoints.tabletBreakpoint = props.breakpoints.tabletBreakpoint;
		if (props.breakpoints.laptopBreakpoint !== undefined)
			newConfig.breakpoints.laptopBreakpoint = props.breakpoints.laptopBreakpoint;
		if (props.breakpoints.thresholds)
			newConfig.breakpoints.thresholds = {
				...newConfig.breakpoints.thresholds,
				...props.breakpoints.thresholds
			} as Thresholds;
	}
	if (props?.styles) {
		if (props.styles.spacing !== undefined) newConfig.styles.spacing = props.styles.spacing;
		if (props.styles.corner !== undefined) {
			if (props.styles.corner.active !== undefined)
				newConfig.styles.corner.active = props.styles.corner.active;
			if (props.styles.corner.radius)
				newConfig.styles.corner.radius = {
					...newConfig.styles.corner.radius,
					...props.styles.corner.radius
				} as Radius;
		}
		if (props.styles.font)
			newConfig.styles.font = {
				...newConfig.styles.font,
				...props.styles.font
			} as FontFamily;
	}
	return newConfig;
};
