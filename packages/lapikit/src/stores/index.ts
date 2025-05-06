import { writable, type Writable } from 'svelte/store';

// states
const _default = 'light';
const isBrowser = typeof window !== 'undefined';
export const colorScheme: Writable<'auto' | 'dark' | 'light'> = writable(_default);

export function updateThemeStore(update: 'auto' | 'dark' | 'light') {
	colorScheme.update(() => {
		if (isBrowser) {
			const ref = document.documentElement.classList;

			if (update === 'auto') ref.remove('light', 'dark');
			else {
				ref.remove(update === 'dark' ? 'light' : 'dark');
				ref.add(update === 'dark' ? 'dark' : 'light');
			}

			localStorage.setItem('@lapikit/theme', update);
		}
		return update;
	});
}

export function setColorScheme(scheme: 'auto' | 'dark' | 'light') {
	updateThemeStore(scheme);
}
