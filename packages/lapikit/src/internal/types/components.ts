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
