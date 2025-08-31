import { writable, type Writable } from 'svelte/store';

type PreferColorScheme = 'system' | 'dark' | 'light';

// presets
const colorSchemeRef: PreferColorScheme = 'system';
const themeRef: string = 'lapikit';

// states
const isBrowser = typeof window !== 'undefined';

export const colorScheme: Writable<PreferColorScheme> = writable(colorSchemeRef);
export const colorSchemeSystem: Writable<'dark' | 'light'> = writable('light');
export const theme: Writable<string> = writable(themeRef);

export function useColorScheme(scheme: PreferColorScheme, key: string = '@lapikit/color-scheme') {
	colorScheme.update(() => {
		if (isBrowser) {
			const ref = document.documentElement.classList;

			if (scheme === 'system') ref.remove('light', 'dark');
			else {
				ref.remove(scheme === 'dark' ? 'light' : 'dark');
				ref.add(scheme === 'dark' ? 'dark' : 'light');
			}

			localStorage.setItem(key, scheme);
		}
		return scheme;
	});
}

export function useTheme(name: string, key: string = '@lapikit/theme') {
	theme.update(() => {
		if (isBrowser) {
			const html = document.documentElement;
			html.setAttribute('data-theme', name);
			localStorage.setItem(key, name);
		}
		return name;
	});
}
