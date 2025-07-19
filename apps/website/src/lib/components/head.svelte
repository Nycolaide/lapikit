<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_BASE_URL, PUBLIC_DEV_MODE } from '$env/static/public';
	import { capitalize } from 'site-kit/actions';

	interface HeadProps {
		title?: string;
		description?: string;
		openGraph?: {
			title?: string;
			description?: string;
			url?: string;
			site?: string;
			locale?: string;
			image?: string;
			type?: string;
		};
		twitterGraph?: {
			card?: string;
			site?: string;
			creator?: string;
			title?: string;
			description?: string;
			image?: string;
		};
	}

	let { title = 'lapikit', description, openGraph, twitterGraph }: HeadProps = $props();

	// states
	let url = `${PUBLIC_BASE_URL}${page.url.pathname === '/' ? '' : page.url.pathname}`;
</script>

<svelte:head>
	<title
		>{page.url.pathname === '/'
			? `${capitalize(title)} • ${capitalize('Svelte Components Library')}`
			: `${capitalize(title)} • ${capitalize('Lapikit Svelte Components')}`}</title
	>
	{#if description}
		<meta name="description" content={description} />
	{/if}

	<link rel="canonical" href={url} />
	<link rel="alternate" hreflang="x-default" href={url} />

	{#if PUBLIC_DEV_MODE !== 'true'}
		<meta name="robots" content="index,follow" />
	{:else}
		<meta name="robots" content="noindex,nofollow" />
	{/if}

	<meta name="color-scheme" content="light dark" />
	<meta name="theme-color" content="#1e2327" />

	<!-- openGraph -->
	<meta property="og:title" content={openGraph?.title ? openGraph?.title : title} />
	<meta
		property="og:description"
		content={openGraph?.description ? openGraph?.description : description}
	/>
	<meta property="og:url" content={openGraph?.url ? openGraph?.url : url} />
	<meta property="og:site_name" content={openGraph?.site ? openGraph?.site : 'Lapikit'} />
	<meta property="og:locale" content={openGraph?.locale ? openGraph?.locale : 'en'} />
	<!-- <meta
		property="og:image"
		content={openGraph?.image ? openGraph?.image : '/images/lapikit-cover.jpg'}
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="675" />
	 -->
	<meta property="og:type" content={openGraph?.type ? openGraph?.type : 'website'} />

	<!-- twitter -->
	<meta
		name="twitter:card"
		content={twitterGraph?.card ? twitterGraph?.card : 'summary_large_image'}
	/>
	<meta name="twitter:site" content={twitterGraph?.site} />
	<meta name="twitter:creator" content={twitterGraph?.creator} />
	<meta name="twitter:title" content={twitterGraph?.title ? twitterGraph?.title : title} />
	<meta
		name="twitter:description"
		content={twitterGraph?.description ? twitterGraph?.description : description}
	/>
	<!-- <meta
		name="twitter:image"
		content={twitterGraph?.image ? twitterGraph?.image : '/images/lapikit-cover.jpg'}
	/>
	<meta name="twitter:image:width" content="1200" />
	<meta name="twitter:image:height" content="675" /> -->
</svelte:head>
