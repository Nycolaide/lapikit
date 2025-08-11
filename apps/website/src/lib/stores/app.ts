//environment
import { PUBLIC_DEV_MODE } from '$env/static/public';
import { writable, readable } from 'svelte/store';

// internal
export const developmentMode = writable(PUBLIC_DEV_MODE == 'true' ? true : false);

// user device
export const deviceUsed = readable('other', (set) => {
	if (typeof navigator !== 'undefined') {
		set(navigator.platform.toUpperCase().includes('MAC') ? 'apple' : 'other');
	}
});
