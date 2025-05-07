import { x11ColorNames } from '$lib/utils/x11.js';

export function getAssets() {
	return {
		className(
			key: string,
			type: string,
			value: string | boolean | Array<string> | { [key: string]: string }
		) {
			if (typeof value === 'string') return `kit-${key}--${type}-${value}`;
			else if (typeof value === 'boolean' && value) return `kit-${key}--${type}`;
			else if (typeof value === 'object') {
				if (Array.isArray(value)) {
					return value
						.map((media) => `${media === '_default' ? '' : `${media}:`}kit--${type}`)
						.join(' ');
				} else {
					return Object.entries(value)
						.map(
							([media, value]) =>
								`${media === '_default' ? '' : `${media}:`}kit-${key}--${type}-${value}`
						)
						.join(' ');
				}
			}
		},
		color(color?: string) {
			if (color) {
				if (
					color.includes('#') ||
					color.includes('rgb') ||
					color.includes('rgba') ||
					color.includes('oklch') ||
					x11ColorNames.includes(color.toLowerCase())
				)
					return color;
				return `var(--kit-${color})`;
			}
		}
	};
}
