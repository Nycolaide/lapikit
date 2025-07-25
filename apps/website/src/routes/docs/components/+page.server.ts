import { PUBLIC_BASE_URL } from '$env/static/public';
import { capitalize } from 'site-kit/actions';

export const load = async ({ url }) => {
	const segments = url.pathname.split('/').filter(Boolean);

	const items = [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: { PUBLIC_BASE_URL }
		},
		...segments.map((s, i) => ({
			'@type': 'ListItem',
			position: i + 2,
			name: capitalize(s.replace(/-/g, ' ')),
			item: `${PUBLIC_BASE_URL}/${segments.slice(0, i + 1).join('/')}`
		}))
	];

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items
	};

	return {
		breadcrumbJsonLd: JSON.stringify(breadcrumbJsonLd)
	};
};
