import type { SClassProp, SStyleProp } from '$lib/labs/compiler/types/dom.js';

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
		Object.entries(sClass).forEach(([key, value]) => {
			if (value === true) {
				classes.push(key);
			} else if (typeof value === 'string' && value) {
				classes.push(value);
			}
		});
	}

	// s-class_xxx
	Object.entries(classDirectiveProps).forEach(([key, value]) => {
		const base = key.replace('s-class_', '');

		if (value === true) {
			classes.push(base);
		} else if (typeof value === 'string' && value) {
			classes.push(`${base}${value}`);
		}
	});

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
		Object.entries(sStyle).forEach(([key, value]) => {
			if (value) {
				styles.push(`${key}: ${value}`);
			}
		});
	}

	Object.entries(styleDirectiveProps).forEach(([key, value]) => {
		const base = key.replace('s-style_', '');
		if (value) {
			styles.push(`${base}: ${value}`);
		}
	});

	return styles.join('; ');
}

/**
 * Makes component props by separating s-class and s-style directives from other props.
 * @param props The original props object containing all props.
 * @returns An object containing separated classProps, styleProps, and restProps.
 */
export function makeComponentProps(props: Record<string, unknown>) {
	const classProps = Object.fromEntries(
		Object.entries(props).filter(([key]) => key.startsWith('s-class_'))
	);

	const styleProps = Object.fromEntries(
		Object.entries(props).filter(([key]) => key.startsWith('s-style_'))
	);

	const restProps = Object.fromEntries(
		Object.entries(props).filter(
			([key]) => !key.startsWith('s-class') && !key.startsWith('s-style')
		)
	);

	return { classProps, styleProps, restProps };
}
