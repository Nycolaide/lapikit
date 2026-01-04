<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import OptimizedImage from '$lib/components/OptimizedImage.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let { data }: { data: PageData } = $props();

	const breadcrumbs = [
		{ label: 'Homepage', url: '/' },
		{ label: 'Blog', url: '/blog' }
	];
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<link rel="canonical" href="{PUBLIC_BASE_URL}{data.meta.canonical}" />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{PUBLIC_BASE_URL}/blog" />
</svelte:head>

<div>
	<Breadcrumb items={breadcrumbs} baseUrl={PUBLIC_BASE_URL} />
	<header>
		<h1>Blog</h1>
		<p>Discover all articles</p>
	</header>

	<div>
		{#each data.posts as post, index (post.slug)}
			<article>
				<a href="/blog/{post.slug}">
					{#if post.image}
						<OptimizedImage 
							src={post.image} 
							alt={post.title}
							priority={index === 0}
						/>
					{/if}
					<div>
						<h2>{post.title}</h2>
						{#if post.description}
							<p>{post.description}</p>
						{/if}
						<div>
							{#if post.date}
								<time datetime={post.date}>
									{new Date(post.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
							{/if}
							{#if post.author}
								<span>By {post.author}</span>
							{/if}
						</div>
						{#if post.tags && post.tags.length > 0}
							<div>
								{#each post.tags as tag (tag)}
									<span>{tag}</span>
								{/each}
							</div>
						{/if}
					</div>
				</a>
			</article>
		{/each}
	</div>
</div>
