import type { useClassNameProps, useStylesProps } from '$lib/labs/utils/types/index.js';

/**
 * useClassName - Utility to compute class names for a component.
 * @param baseClass - The base class name for the component.
 * @param className - Additional class names as a string.
 * @param sClass - The s-class property which can be a string, array, or object.
 * @param classProps - An object containing s-class_xxx directives.
 * @returns A computed class string.
 */
export function useClassName({
	baseClass = '',
	className,
	sClass,
	classProps
}: useClassNameProps = {}): string {
	const classes: string[] = [];

	if (baseClass) {
		classes.push(baseClass);
	}

	if (typeof sClass === 'string' && sClass) {
		classes.push(sClass);
	}

	if (Array.isArray(sClass)) {
		for (const value of sClass) {
			if (typeof value === 'string' && value) {
				classes.push(value);
			}
		}
	}

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

	if (classProps) {
		const entries = Object.entries(classProps);
		if (entries.length > 0) {
			for (const [key, value] of entries) {
				// Use slice instead of replace for better performance (8 = 's-class_'.length)
				const base = key.slice(8);

				if (value === true) {
					classes.push(base);
				} else if (typeof value === 'string' && value) {
					classes.push(`${base}${value}`);
				}
			}
		}
	}

	if (className) {
		classes.push(className);
	}

	return classes.filter(Boolean).join(' ');
}

/**
 * useStyles - Utility to compute style declarations for a component (optimized pure function).
 * @param styleAttr - Inline style attribute as a string.
 * @param sStyle - The s-style property which is an object of style key-value pairs.
 * @param styleProps - An object containing s-style_xxx directives.
 * @returns A computed style string.
 */
export function useStyles({ styleAttr, sStyle, styleProps }: useStylesProps = {}): string {
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

	if (styleProps) {
		const entries = Object.entries(styleProps);
		if (entries.length > 0) {
			for (const [key, value] of entries) {
				// Use slice instead of replace for better performance (8 = 's-style_'.length)
				const base = key.slice(8);
				if (value) {
					styles.push(`${base}: ${value}`);
				}
			}
		}
	}

	if (styleAttr) {
		styles.push(styleAttr);
	}

	return styles.filter(Boolean).join('; ');
}
