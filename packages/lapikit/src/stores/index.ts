import { writable, type Writable } from 'svelte/store';

// states
const colorScheme_default = 'light';
const modalOpen_default = false;
const isBrowser = typeof window !== 'undefined';
export const colorScheme: Writable<'auto' | 'dark' | 'light'> = writable(colorScheme_default);
export const modalOpen: Writable<boolean | 'persistent'> = writable(modalOpen_default);
export const modalStack = writable<string[]>([]);

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

export function setOpenModal(state: boolean | 'persistent') {
	modalOpen.set(state);
}
export const pushModal = (id: string) => {
	modalStack.update((stack) => {
		if (!stack.includes(id)) return [...stack, id];
		return stack;
	});
};

export const popModal = (id: string) => {
	modalStack.update((stack) => {
		const newStack = stack.filter((m) => m !== id);
		return newStack.length === 0 ? [] : newStack;
	});
};
