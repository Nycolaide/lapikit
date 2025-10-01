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

export const enableFeatures = [
	{
		icon: 'mgc_sparkles_line',
		title: {
			en: 'Lightweight & fast'
		},
		description: {
			en: 'Lapikit is designed to be lightweight and fast, ensuring optimal performance for your applications.'
		}
	},
	{
		icon: 'mgc_ease_in_out_control_point_line',
		title: {
			en: 'Transition & animations'
		},
		description: {
			en: 'Easily add transitions and animations to your components with built-in support for popular animation libraries.'
		}
	},
	{
		icon: 'mgc_pic_ai_line',
		title: {
			en: 'Scoped styles'
		},
		description: {
			en: 'All styles are scoped to their respective components, preventing style leakage and ensuring consistent design across your application.'
		}
	},
	{
		icon: 'mgc_package_2_line',
		title: {
			en: 'Components'
		},
		description: {
			en: 'A comprehensive library of pre-built, accessible, and customizable UI components to accelerate your development process.'
		}
	},
	{
		icon: 'mgc_palette_2_line',
		title: {
			en: 'Themes & customization'
		},
		description: {
			en: 'Includes light and dark themes, with easy customization options to match your brand colors.'
		}
	},
	{
		icon: 'mgc_flashlight_line',
		title: {
			en: 'Typescript support'
		},
		description: {
			en: 'Written in TypeScript, Lapikit provides type definitions out of the box for a better developer experience.'
		}
	},
	{
		icon: 'mgc_flashlight_line',
		title: {
			en: 'SvelteKit friendly'
		},
		description: {
			en: 'Lapikit is built with SvelteKit and fully supports its features like routing, server-side rendering, and static site generation.'
		}
	}
];

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

export const stepperToUseComponent = [
	{
		title: 'Install Lapikit',
		description: 'In five minutes, install Lapikit and configure it in your SvelteKit project.',
		icon: 'mgc_rocket_line',
		color: 'accent-destructive'
	},
	{
		title: 'Add components to your project',
		description:
			'Explore the wide range of components available in Lapikit and choose the ones that fit your needs.',
		icon: 'mgc_package_line',
		color: 'accent-warning'
	},
	{
		title: 'Adapte all components to your design',
		description:
			"Customize the appearance of the components to match your project's design and branding.",
		icon: 'mgc_paint_brush_ai_line',
		color: 'accent-success'
	}
];
