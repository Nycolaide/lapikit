import { dev } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const url: string = dev ? 'http://localhost:5173' : PUBLIC_BASE_URL;

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

export const navigationMain: { key: string; path: string; external?: boolean }[] = [
	{
		key: 'home',
		path: '/'
	},
	{
		key: 'docs',
		path: '/docs/button'
	},
	{
		key: 'github',
		path: 'https://github.com/Nycolaide/lapikit',
		external: true
	}
];
