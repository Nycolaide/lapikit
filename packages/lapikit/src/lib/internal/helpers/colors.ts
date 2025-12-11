import { x11Colors } from '$lib/internal/core/x11-colors.js';

export const formatColor = (input: string) => {
	input = input.trim();

	if (input.startsWith('#')) {
		const rgb = hexToRgb(input);
		return rgbToOklch(rgb.r, rgb.g, rgb.b);
	}

	if (input.startsWith('rgb')) {
		const parts = input
			.replace(/rgba?|\(|\)|\s+/g, '')
			.split(',')
			.map(Number);
		return rgbToOklch(parts[0], parts[1], parts[2]);
	}

	if (input.startsWith('oklch(')) return input;

	if (x11Colors[input]) {
		const hex = x11Colors[input];
		const rgb = hexToRgb(hex);
		return rgbToOklch(rgb.r, rgb.g, rgb.b);
	}

	return input;
};

const hexToRgb = (hex: string) => {
	const clean = hex.replace('#', '');
	const bigint = parseInt(clean, 16);
	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255
	};
};

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const rgbToOklch = (r: number, g: number, b: number) => {
	r = srgbToLinear(r / 255);
	g = srgbToLinear(g / 255);
	b = srgbToLinear(b / 255);

	const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

	const l_ = Math.cbrt(l);
	const m_ = Math.cbrt(m);
	const s_ = Math.cbrt(s);

	const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
	const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
	const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

	const C = Math.sqrt(a * a + b_ * b_);
	const h = (Math.atan2(b_, a) * 180) / Math.PI;

	return `oklch(${(L * 100).toFixed(3)}% ${C.toFixed(4)} ${((h + 360) % 360).toFixed(2)})`;
};
