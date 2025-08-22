// store breakpoints and thresholds
import { writable, type Writable } from 'svelte/store';

type Breakpoints = {
	[key: string]: number | string;
};

// presets
const ref: Breakpoints = {
	base: 0, // 0px
	xs: '28rem', //448px
	sm: '40rem', //640px
	md: '48rem', //768px
	lg: '64rem', //1024px
	xl: '80rem', //1280px
	'2xl': '96rem', //1536px
	'3xl': '112rem' //1792px
};

export const breakpoints: Writable<Breakpoints> = writable(ref);

// export function setBreakpoints(newBreakpoints: Breakpoints) {
// 	breakpoints.set(newBreakpoints);
// }

// export function updateBreakpoint(key: string, value: number) {
// 	breakpoints.update((bp) => ({
// 		...bp,
// 		[key]: value
// 	}));
// }
