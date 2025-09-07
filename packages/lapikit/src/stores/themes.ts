import { writable, type Writable } from 'svelte/store';

// presets
const themeRef: string = 'light';

// states
const isBrowser = typeof window !== 'undefined';

export const theme: Writable<string> = writable(themeRef);

export function useTheme(name: string, key: string = '@lapikit/theme') {
	theme.update(() => {
		if (isBrowser) {
			const html = document.documentElement;

			html.classList.forEach((cls) => {
				if (cls.startsWith('kit-theme--')) {
					html.classList.remove(cls);
				}
			});

			html.classList.add(`kit-theme--${name}`);
			localStorage.setItem(key, name);
		}
		return name;
	});
}
