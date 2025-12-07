import type { SClassProp, SStyleProp } from '../utils/props.js';

export function useClassName({
	baseClass = '',
	className,
	sClass,
	classDirectiveProps
}: {
	baseClass?: string;
	className?: string;
	sClass?: SClassProp;
	classDirectiveProps?: Record<string, unknown>;
} = {}) {
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

			if (classDirectiveProps) {
				Object.entries(classDirectiveProps).forEach(([key, value]) => {
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

export function useStyles({
	styleAttr,
	sStyle,
	styleDirectiveProps
}: {
	styleAttr?: string;
	sStyle?: SStyleProp;
	styleDirectiveProps?: Record<string, unknown>;
} = {}) {
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

			if (styleDirectiveProps) {
				Object.entries(styleDirectiveProps).forEach(([key, value]) => {
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
