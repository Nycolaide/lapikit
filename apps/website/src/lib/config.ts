import { dev } from '$app/environment';

export const url: string = dev ? 'http://localhost:5173' : '';

export const staticPages: Array<string> = [''];

export const packageManagers: { name: string; icon: string }[] = [
	{
		name: 'npm',
		icon: 'mdi:npm'
	},
	{
		name: 'yarn',
		icon: 'mdi:yarn'
	}
];
