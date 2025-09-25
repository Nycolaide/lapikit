import { dev } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const url: string = dev ? 'http://localhost:5173' : PUBLIC_BASE_URL;

export const staticPages: Array<string> = ['docs/components', 'terms'];
export const discordUrl: string = 'https://discord.gg/gn9ZGtDtK4';
export const githubUrl: string = 'https://github.com/Nycolaide/lapikit';
export const githubIssuesUrl: string = 'https://github.com/Nycolaide/lapikit/issues';
export const githubEditPageUrl: string = 'https://github.com/Nycolaide/lapikit/tree/main/docs';
export const githubDiscussionsUrl: string = 'https://github.com/Nycolaide/lapikit/discussions';
export const licenceUrl: string = 'https://github.com/Nycolaide/lapikit/blob/main/LICENSE';
export const npmUrl: string = 'https://www.npmjs.com/package/lapikit';

export const packageManagers: { name: string; icon: string }[] = [
	{
		name: 'npm',
		icon: 'mdi:npm'
	},
	{
		name: 'yarn',
		icon: 'mdi:yarn'
	},
	{
		name: 'bun',
		icon: 'mdi:bun'
	}
];

interface NavigationMain {
	key: string;
	path: string;
	external?: boolean;
	icon?: string;
}

export const navigationMain: NavigationMain[] = [
	{
		key: 'docs',
		path: '/docs/introduction',
		icon: 'mgc_album_2_line'
	},
	{
		key: 'components',
		path: '/docs/components',
		icon: 'mgc_album_2_line'
	},
	{
		key: 'changelog',
		path: '/docs/changelog',
		icon: 'mgc_album_2_line'
	}
];

export const navigationFooter: NavigationMain[] = [...navigationMain];

export const sectionDocs = [
	{
		key: 'base',
		icon: 'mgc_album_2_line'
	},
	{
		key: 'components',
		icon: 'mgc_plugin_2_line',
		submenu: true
	},
	{
		key: 'stores',
		icon: 'mgc_braces_line',
		submenu: true
	},
	{
		key: 'actions',
		icon: 'mgc_braces_line',
		submenu: true
	},
	{
		key: 'undefined',
		icon: 'mgc_github_line'
	}
];

export interface MetaDataPages {
	title: string;
	fileName?: string;
	icon?: string;
	slug?: string;
	state?: string;
	style?: {
		icon?: string | null;
		cover?: string | null;
		color?: string | null;
	} | null;
	metadata?: {
		slug: string;
		date: string;
	};
}
