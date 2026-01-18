export type SClassProp = string | string[] | Record<string, boolean | string> | undefined;
export type SStyleProp = Record<string, boolean | string> | undefined;

export function splitSyntheticProps(allProps: Record<string, unknown>) {
	const classDirectiveProps = Object.fromEntries(
		Object.entries(allProps).filter(([key]) => key.startsWith('s-class_'))
	);

	const styleDirectiveProps = Object.fromEntries(
		Object.entries(allProps).filter(([key]) => key.startsWith('s-style_'))
	);

	const regularProps = Object.fromEntries(
		Object.entries(allProps).filter(
			([key]) => !key.startsWith('s-class') && !key.startsWith('s-style')
		)
	);

	return { classDirectiveProps, styleDirectiveProps, regularProps };
}

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