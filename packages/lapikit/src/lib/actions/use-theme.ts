import { theme } from '$lib/stores/themes.js';

// states
const isBrowser = typeof window !== 'undefined';

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
