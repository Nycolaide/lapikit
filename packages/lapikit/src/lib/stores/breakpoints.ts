// store breakpoints and thresholds
import { writable, type Writable } from 'svelte/store';

type Breakpoints = {
	[key: string]: number;
};

// presets
const ref: Breakpoints = {
	base: 0, // 0px
	xs: 448, //28rem
	sm: 640, //40rem
	md: 768, //48rem
	lg: 1024, //64rem
	xl: 1280, //80rem
	'2xl': 1536, //96rem
	'3xl': 1792 //112rem
};

export const breakpoints: Writable<Breakpoints> = writable(ref);
