import { writable } from 'svelte/store';

export function useDebounced<T>(value: T, delay = 300) {
	const debounced = writable(value);
	let timeout: ReturnType<typeof setTimeout>;

	return {
		subscribe: debounced.subscribe,
		set(newValue: T) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				debounced.set(newValue);
			}, delay);
		}
	};
}
