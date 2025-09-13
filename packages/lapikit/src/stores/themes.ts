import { writable, type Writable } from 'svelte/store';

// presets
const themeRef: string = 'light';

export const theme: Writable<string> = writable(themeRef);
