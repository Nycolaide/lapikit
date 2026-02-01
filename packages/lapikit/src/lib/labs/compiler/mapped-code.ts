import type { SClassProp, SStyleProp } from '$lib/labs/compiler/types/index.js';
import type { PropValue } from '$lib/labs/utils/types/index.js';

/**
 * Computes a string of class names based on the provided sClass and classDirectiveProps.
 * @param sClass - The s-class property which can be a string, array, or object.
 * @param classDirectiveProps - An object containing s-class_xxx directives.
 * @returns A string of class names.
 */
export function computeSClasses(
	sClass: SClassProp,
	classDirectiveProps: Record<string, unknown>
): string {
	const classes: string[] = [];

	// s-class string
	if (typeof sClass === 'string' && sClass) {
		classes.push(sClass);
	}

	// s-class array
	if (Array.isArray(sClass)) {
		for (const value of sClass) {
			if (typeof value === 'string' && value) {
				classes.push(value);
			}
		}
	}

	// s-class object
	if (sClass && typeof sClass === 'object' && !Array.isArray(sClass)) {
		const entries = Object.entries(sClass);
		if (entries.length > 0) {
			for (const [key, value] of entries) {
				if (value === true) {
					classes.push(key);
				} else if (typeof value === 'string' && value) {
					classes.push(value);
				}
			}
		}
	}

	// s-class_xxx
	const classEntries = Object.entries(classDirectiveProps);
	if (classEntries.length > 0) {
		for (const [key, value] of classEntries) {
			// Use slice instead of replace for better performance (8 = 's-class_'.length)
			const base = key.slice(8);

			if (value === true) {
				classes.push(base);
			} else if (typeof value === 'string' && value) {
				classes.push(`${base}${value}`);
			}
		}
	}

	return classes.join(' ');
}

/**
 * Computes a string of style declarations based on the provided sStyle and styleDirectiveProps.
 * @param sStyle - The s-style property which is an object of style key-value pairs.
 * @param styleDirectiveProps - An object containing s-style_xxx directives.
 * @returns A string of style declarations.
 */
export function computeSStyles(
	sStyle: SStyleProp,
	styleDirectiveProps: Record<string, unknown>
): string {
	const styles: string[] = [];

	if (sStyle && typeof sStyle === 'object') {
		const entries = Object.entries(sStyle);
		if (entries.length > 0) {
			for (const [key, value] of entries) {
				if (value) {
					styles.push(`${key}: ${value}`);
				}
			}
		}
	}

	const styleEntries = Object.entries(styleDirectiveProps);
	if (styleEntries.length > 0) {
		for (const [key, value] of styleEntries) {
			// Use slice instead of replace for better performance (8 = 's-style_'.length)
			const base = key.slice(8);
			if (value) {
				styles.push(`${base}: ${value}`);
			}
		}
	}

	return styles.join('; ');
}

/**
 * Makes component props by separating s-class and s-style directives from other props.
 * Optimized to use a single pass instead of three separate iterations.
 * @param props The original props object containing all props.
 * @returns An object containing separated classProps, styleProps, and restProps.
 */
export function makeComponentProps(props: Record<string, unknown>): {
	classProps: Record<string, PropValue>;
	styleProps: Record<string, PropValue>;
	restProps: Record<string, unknown>;
} {
	const classProps: Record<string, PropValue> = {};
	const styleProps: Record<string, PropValue> = {};
	const restProps: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(props)) {
		if (key.startsWith('s-class_')) {
			classProps[key] = value as PropValue;
		} else if (key.startsWith('s-style_')) {
			styleProps[key] = value as PropValue;
		} else if (!key.startsWith('s-class') && !key.startsWith('s-style')) {
			restProps[key] = value;
		}
	}

	return { classProps, styleProps, restProps };
}
