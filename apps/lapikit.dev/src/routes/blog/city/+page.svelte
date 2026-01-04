<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<link rel="canonical" href="{data.baseUrl}{data.meta.canonical}" />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
	
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{data.baseUrl}/blog/city" />
</svelte:head>

<div>
	<Breadcrumb items={data.breadcrumbs} baseUrl={data.baseUrl} />

	<header>
		<h1>Cities</h1>
		<p>Discover our articles about cities around the world</p>
		<div>
			<span>{data.posts.length} post{data.posts.length > 1 ? 's' : ''}</span>
		</div>
	</header>

	{#if data.posts.length > 0}
		<div>
			{#each data.posts as post (post.slug)}
				<article>
					<a href="/blog/{post.slug}">
						{#if post.image}
							<img src={post.image} alt={post.title}/>
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
	{:else}
		<div>
			<p>No articles available at the moment.</p>
			<a href="/blog">← Back to blog</a>
		</div>
	{/if}
</div>
