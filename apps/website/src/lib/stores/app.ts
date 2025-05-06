import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const storage = browser ? localStorage : null;
const value = storage == null ? void 0 : storage.getItem('@lapikit/theme');

export function setColorScheme(theme: string) {
	colorScheme.set(theme);
}

export const colorScheme = writable(
	value
		? value
		: browser
			? window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			: 'light'
);

// subscribe

// colorScheme.subscribe(($theme: string) => {
// 	if (!browser) return;
// });
