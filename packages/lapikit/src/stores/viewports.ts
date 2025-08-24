// store viewport and screen dimensions
import { writable, type Writable } from 'svelte/store';

// presets
const refWidth: number = 0;

export const viewportWidth: Writable<number> = writable(refWidth);
