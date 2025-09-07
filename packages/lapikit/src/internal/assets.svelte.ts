import { x11ColorNames } from '$lib/utils/x11.js';

export function getAssets() {
	return {
		shape(params?: string) {
			if (params) {
				if (params === 'none' || params == '0') return '0';
				return `var(--system-shape-${params})`;
			}
		},
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
						.map((media) => `${media === 'base' ? '' : `${media}:`}kit--${type}`)
						.join(' ');
				} else {
					return Object.entries(value)
						.map(
							([media, value]) =>
								`${media === 'base' ? '' : `${media}:`}kit-${key}--${type}-${value}`
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
				if (color.includes('transparent') || color.includes('inherit') || color.includes('initial'))
					return color;
				return `var(--kit-${color})`;
			}
		},
		unit(value?: string | number) {
			if (typeof value === 'number') return `${value}px`;
			if (typeof value === 'string') {
				const cleaned = value.trim();
				const isOnlyNumericLike = /^[\d.,]+$/.test(cleaned);
				if (isOnlyNumericLike) return `${value}px`;
			}
			return value;
		}
	};
}
