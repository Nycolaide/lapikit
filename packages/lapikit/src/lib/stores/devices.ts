// store devices
import { writable, type Writable } from 'svelte/store';

type Devices = {
	[key: string]: number;
};

// presets
const ref: Devices = {
	desktop: 1024, //64rem (lg)
	tablet: 768, //48rem (md)
	mobile: 375 //28rem (sm)
};

export const devices: Writable<Devices> = writable(ref);
