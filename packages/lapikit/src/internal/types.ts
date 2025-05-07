import type { Snippet } from 'svelte';

type IdElementType = string | undefined;
type ClassNameType = string | string[] | undefined;
type StylePropertiesType = string | undefined;

export interface Base {
	id?: IdElementType;
	class?: ClassNameType;
	style?: StylePropertiesType;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface Component extends Base {
	children?: Snippet;
}

export type FontFamily = { [key: string]: string | string[] };
export type Colors = { [key: string]: { light: string; dark: string } | string };
export type Thresholds = { [key: string]: number | string };
export type Radius = { [key: string]: number | string };

export interface Lapikit {
	options: {
		normalize: boolean;
		minify: boolean;
	};
	theme: {
		colorScheme: string;
		colors: Colors;
	};
	breakpoints: {
		mobileBreakpoint: string;
		tabletBreakpoint: string;
		laptopBreakpoint: string;
		thresholds: Thresholds;
	};
	styles: {
		spacing: string;
		corner: {
			active: boolean;
			radius: Radius;
		};
		font: FontFamily;
	};
}
type DeepOptional<T> = {
	[P in keyof T]?: T[P] extends (infer U)[]
		? DeepOptional<U>[]
		: T[P] extends object
			? DeepOptional<T[P]>
			: T[P];
};
export type LapikitConfig = DeepOptional<Lapikit>;
