import { readable } from 'svelte/store';

export const isMac = readable(false, (set) => {
	if (typeof navigator !== 'undefined') {
		set(navigator.platform.toUpperCase().includes('MAC'));
	}
});
