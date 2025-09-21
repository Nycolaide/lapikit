import { writable } from 'svelte/store';

export type Viewport = {
	innerWidth: number;
	outerWidth: number;
	innerHeight: number;
	outerHeight: number;
};

export const viewport = writable<Viewport>({
	innerWidth: 0,
	outerWidth: 0,
	innerHeight: 0,
	outerHeight: 0
});
