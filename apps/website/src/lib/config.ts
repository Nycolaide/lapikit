import { dev } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const url: string = dev ? 'http://localhost:5173' : PUBLIC_BASE_URL;

export const staticPages: Array<string> = ['docs/components', 'terms'];
export const discordUrl: string = 'https://discord.gg/gn9ZGtDtK4';
export const githubUrl: string = 'https://github.com/Nycolaide/lapikit';
export const githubIssuesUrl: string = 'https://github.com/Nycolaide/lapikit/issues';
export const githubEditPageUrl: string = 'https://github.com/Nycolaide/lapikit/tree/main/docs';
export const githubDiscussionsUrl: string = 'https://github.com/Nycolaide/lapikit/discussions';
export const githubContributingUrl: string =
	'https://github.com/Nycolaide/lapikit/blob/main/CONTRIBUTING.md';
export const githubSponsorsUrl: string = 'https://github.com/Nycolaide/lapikit';
export const licenceUrl: string = 'https://github.com/Nycolaide/lapikit/blob/main/LICENSE';
export const npmUrl: string = 'https://www.npmjs.com/package/lapikit';
export const buyMeACoffeeUrl: string = 'https://www.buymeacoffee.com/nycolaide';
export const xUrl: string = 'https://x.com/lapikit';

export const packageManagers: { name: string; icon: string }[] = [
	{
		name: 'npm',
		icon: '/icons/npm-color.svg'
	},
	{
		name: 'yarn',
		icon: '/icons/yarn-color.svg'
	},
	{
		name: 'bun',
		icon: '/icons/bun-color.svg'
	}
];

interface NavigationMain {
	key: string;
	path: string;
	external?: boolean;
	icon?: string;
	items?: Array<{ key: string; path: string; external?: boolean; icon?: string }>;
}

export const navigationMain: NavigationMain[] = [
	{
		key: 'docs',
		path: '/docs/introduction',
		icon: 'mgc_package_2_line'
	},
	{
		key: 'components',
		path: '/docs/components',
		icon: 'mgc_cube_line'
	},
	{
		key: 'stores',
		path: '/docs/stores',
		icon: 'mgc_restore_line'
	},
	{
		key: 'hooks',
		path: '/docs/actions',
		icon: 'mgc_webhook_line'
	}
];

interface NavigationFooter {
	name: string;
	link: Array<{
		key: string;
		path: string;
		external?: boolean;
		icon?: string;
		custom?: string;
	}>;
}

export const navigationFooter: NavigationFooter[] = [
	{
		name: 'product',
		link: [...navigationMain]
	},
	{
		name: 'policies',
		link: [
			{
				key: 'terms_and_privacy',
				path: '/terms'
			},
			{
				key: 'cookie',
				custom: 'cookie-consent'
			}
		]
	}
];

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

export const previewComponents = [
	{
		image: '/',
		title: {
			en: 'demo'
		},
		description: {
			en: 'demo desc'
		},
		url: '/'
	}
];

export const SocialLinks = [
	{
		name: 'GitHub',
		icon: 'mgc_github_fill',
		color: 'service-github',
		href: githubUrl,
		footer: true
	},
	{
		name: 'Discord',
		icon: 'mgc_discord_fill',
		color: 'service-discord',
		href: discordUrl,
		footer: true
	},
	{
		name: 'NPM',
		icon: '/icons/npm-color.svg',
		color: 'service-npm',
		href: npmUrl,
		footer: true
	},
	{
		name: 'Buy Me A Coffee',
		icon: 'mgc_coffee_line',
		color: 'service-buy-me-a-coffee',
		href: buyMeACoffeeUrl,
		footer: false
	}
];
