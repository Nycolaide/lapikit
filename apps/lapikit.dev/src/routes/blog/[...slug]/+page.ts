import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	// SSR
	const modules = import.meta.glob('/src/content/pages/**/*.md');
	const modulePath = `/src/content/pages/${data.slug}.md`;

	if (modules[modulePath]) {
		const module = (await modules[modulePath]()) as any;
		return {
			...data,
			ArticleComponent: module.default
		};
	}

	return data;
};
