import { disabledScroll } from '$lib/internal/scroll.js';
import { writable, type Writable } from 'svelte/store';

// states
const colorScheme_default = 'system';
const modalOpen_default = false;
const isBrowser = typeof window !== 'undefined';
export const colorScheme: Writable<'system' | 'dark' | 'light'> = writable(colorScheme_default);
export const colorSchemeSystem: Writable<'dark' | 'light'> = writable('light');
export const modalOpen: Writable<boolean | 'persistent'> = writable(modalOpen_default);
export const modalStack = writable<string[]>([]);

export function updateThemeStore(update: 'system' | 'dark' | 'light') {
	colorScheme.update(() => {
		if (isBrowser) {
			const ref = document.documentElement.classList;

			if (update === 'system') ref.remove('light', 'dark');
			else {
				ref.remove(update === 'dark' ? 'light' : 'dark');
				ref.add(update === 'dark' ? 'dark' : 'light');
			}

			localStorage.setItem('@lapikit/theme', update);
		}
		return update;
	});
}

export function setColorScheme(scheme: 'system' | 'dark' | 'light') {
	updateThemeStore(scheme);
}

export function setOpenModal(state: boolean | 'persistent') {
	modalOpen.set(state);
}
export const pushModal = (id: string) => {
	modalStack.update((stack) => {
		let values = stack;
		if (!stack.includes(id)) values = [...stack, id];
		disabledScroll(values.length !== 0 ? true : false);
		return values;
	});
};

export const popModal = (id: string) => {
	modalStack.update((stack) => {
		const newStack = stack.filter((m) => m !== id);
		disabledScroll(newStack.length !== 0 ? true : false);
		return newStack.length === 0 ? [] : newStack;
	});
};

export * from './breakpoints.js';
export * from './viewports.js';
