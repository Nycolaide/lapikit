import type { useClassNameProps, useStylesProps } from '$lib/labs/utils/types/index.js';

/**
 * useClassName - Utility to compute class names for a component.
 * @param baseClass - The base class name for the component.
 * @param className - Additional class names as a string.
 * @param sClass - The s-class property which can be a string, array, or object.
 * @param classProps - An object containing s-class_xxx directives.
 * @returns
 */
export function useClassName({
	baseClass = '',
	className,
	sClass,
	classProps
}: useClassNameProps = {}) {
	return {
		get value() {
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
				Object.entries(sClass).forEach(([key, value]) => {
					if (value === true) {
						classes.push(key);
					} else if (typeof value === 'string' && value) {
						classes.push(value);
					}
				});
			}

			if (classProps) {
				Object.entries(classProps).forEach(([key, value]) => {
					const base = key.replace('s-class_', '');

					if (value === true) {
						classes.push(base);
					} else if (typeof value === 'string' && value) {
						classes.push(`${base}${value}`);
					}
				});
			}

			if (className) {
				classes.push(className);
			}

			return classes.filter(Boolean).join(' ');
		}
	};
}

/**
 * useStyles - Utility to compute style declarations for a component.
 * @param styleAttr - Inline style attribute as a string.
 * @param sStyle - The s-style property which is an object of style key-value pairs.
 * @param styleProps - An object containing s-style_xxx directives.
 * @returns
 */
export function useStyles({ styleAttr, sStyle, styleProps }: useStylesProps = {}) {
	return {
		get value() {
			const styles: string[] = [];

			if (sStyle && typeof sStyle === 'object') {
				Object.entries(sStyle).forEach(([key, value]) => {
					if (value) {
						styles.push(`${key}: ${value}`);
					}
				});
			}

			if (styleProps) {
				Object.entries(styleProps).forEach(([key, value]) => {
					const base = key.replace('s-style_', '');
					if (value) {
						styles.push(`${base}: ${value}`);
					}
				});
			}

			if (styleAttr) {
				styles.push(styleAttr);
			}

			return styles.filter(Boolean).join('; ');
		}
	};
}
