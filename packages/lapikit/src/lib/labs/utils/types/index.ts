import type { SClassProp, SStyleProp } from '$lib/labs/compiler/types/index.js';

export type PropValue = string | boolean | number | null | undefined;

export interface useClassNameProps {
	baseClass?: string;
	className?: string;
	sClass?: SClassProp;
	classProps?: Record<string, PropValue>;
}

export interface useStylesProps {
	styleAttr?: string;
	sStyle?: SStyleProp;
	styleProps?: Record<string, PropValue>;
}
