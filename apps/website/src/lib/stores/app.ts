import { writable, readable } from 'svelte/store';

// internal
export const mode = writable('development');
export const search = writable(false);
export const sectionSelected = writable<string>('base');

export const packageManager = writable('npm');

// user device
export const deviceUsed = readable('other', (set) => {
	if (typeof navigator !== 'undefined') {
		set(navigator.platform.toUpperCase().includes('MAC') ? 'apple' : 'other');
	}
});
