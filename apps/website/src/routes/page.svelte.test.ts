import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './(pages)/+page.svelte';

describe('/+page.svelte', () => {
	test('should render h1', () => {
		const mockData = {
			nav_links: {
				home: { title: 'home', slug: '/' },
				docs: {
					title: 'docs',
					slug: '/docs',
					sections: {}
				}
			},
			header_links: {
				base: {
					key: 'base',
					title: 'Base',
					order: 1,
					slug: '/docs/base',
					style: { color: '', icon: '' },
					categories: []
				},
				components: {
					key: 'components',
					title: 'Components',
					order: 2,
					slug: '/docs/components',
					style: { color: '', icon: '' },
					categories: []
				},
				hooks: {
					key: 'hooks',
					title: 'Hooks',
					order: 3,
					slug: '/docs/hooks',
					style: { color: '', icon: '' },
					categories: []
				}
			},
			footer_links: {
				docs: {
					title: 'product',
					items: {
						base: {
							key: 'base',
							title: 'Base',
							order: 1,
							slug: '/docs/base',
							style: { color: '', icon: '' },
							categories: []
						},
						components: {
							key: 'components',
							title: 'Components',
							order: 2,
							slug: '/docs/components',
							style: { color: '', icon: '' },
							categories: []
						},
						hooks: {
							key: 'hooks',
							title: 'Hooks',
							order: 3,
							slug: '/docs/hooks',
							style: { color: '', icon: '' },
							categories: []
						}
					}
				},
				policies: {
					title: 'policies',
					items: []
				}
			},
			social_links: [],
			counter: { base: 0, components: 0, hooks: 0 },
			url_internal: {
				discord: { invite: 'https://discord.gg/example' },
				github: {
					repository: 'https://github.com/Nycolaide/lapikit',
					issues: 'https://github.com/Nycolaide/lapikit/issues',
					edit_page: 'https://github.com/Nycolaide/lapikit/edit/main',
					discussions: 'https://github.com/Nycolaide/lapikit/discussions',
					contributing: 'https://github.com/Nycolaide/lapikit/blob/main/CONTRIBUTING.md',
					sponsors: 'https://github.com/Nycolaide/lapikit'
				},
				package: {
					licence: 'https://github.com/Nycolaide/lapikit/blob/main/LICENSE'
				},
				npm: {
					package: 'https://www.npmjs.com/package/lapikit'
				},
				buymeacoffee: {
					page: 'https://www.buymeacoffee.com/nycolaide'
				},
				social_network: {
					x: 'https://x.com/lapikit'
				},
				nycolaide: {
					website: 'https://nycolaide.dev',
					github: 'https://github.com/Nycolaide'
				}
			},
			banner: {
				id: 'test-banner',
				start: new Date(),
				end: new Date(),
				arrow: true,
				content: {
					lg: 'Test banner',
					sm: 'Test'
				},
				href: '/test'
			},
			github: null,
			npm: null
		};

		render(Page, { props: { data: mockData } });
		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
	});
});
