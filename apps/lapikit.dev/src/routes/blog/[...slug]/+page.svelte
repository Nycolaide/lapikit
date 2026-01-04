<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import OptimizedImage from '$lib/components/OptimizedImage.svelte';

	let { data }: { data: PageData } = $props();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.metadata.title,
		description: data.meta.description,
		datePublished: data.metadata.date,
		author: {
			'@type': 'Person',
			name: data.metadata.author || 'Unknown'
		},
		image: data.metadata.image,
		url: `${data.baseUrl}/blog/${data.slug}`
	};
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<link rel="canonical" href="{data.baseUrl}{data.meta.canonical}" />
	
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	
	<meta property="og:type" content="article" />
	<meta property="og:url" content="{data.baseUrl}/blog/{data.slug}" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	{#if data.meta.image}
		<meta property="og:image" content={data.meta.image.startsWith('http') ? data.meta.image : `${data.baseUrl}${data.meta.image}`} />
	{/if}
	{#if data.meta.date}
		<meta property="article:published_time" content={data.meta.date} />
	{/if}
	{#if data.meta.author}
		<meta property="article:author" content={data.meta.author} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="{data.baseUrl}/blog/{data.slug}" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	{#if data.meta.image}
		<meta name="twitter:image" content={data.meta.image.startsWith('http') ? data.meta.image : `${data.baseUrl}${data.meta.image}`} />
	{/if}

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<article>
	<Breadcrumb items={data.breadcrumbs} baseUrl={data.baseUrl} />
	
	<header>
		<h1>{data.metadata.title}</h1>
		
		{#if data.metadata.description}
			<p>{data.metadata.description}</p>
		{/if}

		<div>
			{#if data.metadata.date}
				<time datetime={data.metadata.date}>
					{new Date(data.metadata.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			{/if}
			{#if data.metadata.author}
				<span>By {data.metadata.author}</span>
			{/if}
		</div>

		{#if data.metadata.tags && data.metadata.tags.length > 0}
			<div>
				{#each data.metadata.tags as tag (tag)}
					<span>{tag}</span>
				{/each}
			</div>
		{/if}
	</header>

	{#if data.metadata.image}
		<OptimizedImage 
			src={data.metadata.image} 
			alt={data.metadata.title} 
			class="featured-image"
			priority={true}
		/>
	{/if}

	<div>
		{#if data.ArticleComponent}
			<svelte:component this={data.ArticleComponent} />
		{:else}
			<p>Article introuvable</p>
		{/if}
	</div>

	{#if data.prevPost || data.nextPost}
		<nav aria-label="Navigation between posts">
			{#if data.prevPost}
				<a href="/blog/{data.prevPost.slug}">
					<span>← Previous post</span>
					<span>{data.prevPost.title}</span>
				</a>
			{:else}
				<div></div>
			{/if}

			{#if data.nextPost}
				<a href="/blog/{data.nextPost.slug}">
					<span>Next post →</span>
					<span>{data.nextPost.title}</span>
				</a>
			{/if}
		</nav>
	{/if}
</article>
