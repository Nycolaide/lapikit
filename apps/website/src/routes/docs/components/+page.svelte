<script lang="ts">
	import { Button, Card } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { hasNavSections } from '$lib/types/guards';

	let { data } = $props();

	const docsSection = $derived(data.nav_links['docs']);
	const componentsSection = $derived(
		hasNavSections(docsSection) ? docsSection.sections['components'] : null
	);
</script>

<svelte:head>
	<title>Lapikit • Components</title>
	<meta name="description" content="Find out more about Lapikit's Svelte components." />
</svelte:head>

<div class="markdown mb-8">
	<h1 class="title opacity-75">Components</h1>
	<h2 class="subtitle mt-2!">Discover the Lapikit components</h2>

	<p>
		Components are the core of Lapikit. Without them, the library wouldn’t exist. Each component is
		a reusable block of code that manages a complete UI element, fully aligned with the design
		system defined by Lapikit.
	</p>
</div>

<Button rounded="full">Hello World</Button>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-4">
	{#if !componentsSection || componentsSection.categories.length === 0}
		<p>{capitalize('No Components found')}</p>
	{:else}
		{#each componentsSection.categories as category (category.key)}
			{#if category.title !== 'uncategorized'}
				<p>{capitalize(category.title)}</p>
			{/if}

			{#each category.items as page, index (index)}
				<Card
					href={`${page.slug}`}
					class="mb-4 grid grid-cols-[auto_1fr] items-center gap-4 sm:grid-cols-1"
				>
					<img
						src={page.metadata?.style?.cover
							? `/images/${page.metadata.style.cover}?v=1`
							: '/images/preview-component.webp?v=1'}
						alt={`${page.metadata?.title || 'Component'} cover`}
						class="max-sm:max-h-38"
					/>
					<div>
						<p class="text-lg font-bold md:text-xl">
							{capitalize(page.metadata?.title || 'Component')}
						</p>
						<p class="opacity-75">{capitalize((page?.metadata?.introduction as string) || '')}</p>
					</div>
				</Card>
			{/each}
		{/each}
	{/if}
</div>

<div class="markdown mt-2">
	<p>
		Every component receives props (parameters) that allow you to customize its appearance and
		behavior.
	</p>

	<p>
		A concrete example: the Button component. It displays an interactive button that can receive
		text, an icon, a link, or combinations of these. It automatically inherits Lapikit’s styles
		while remaining fully customizable (size, color, variant, states, and more).
	</p>

	<p>
		Components can also be nested. For instance, a Card can contain a Button, images, text, or any
		other components. This nesting respects the Lapikit global configuration, ensuring visual
		consistency and accessibility across your app.
	</p>

	<p>
		Lapikit provides a complete library of Svelte components built for speed, clarity, and
		maintainability. Buttons, cards, dialogs, toolbars, and more are ready to use, so you spend less
		time reinventing UI elements and more time focusing on user experience.
	</p>

	<p>
		All components follow the same design logic and naming conventions, keeping your code clean,
		readable, and scalable. The principle is simple: write less boilerplate, build faster, and
		maintain full control over your interface. Lapikit empowers you to prototype smarter, implement
		consistently, and ship reliable, polished Svelte applications.
	</p>
</div>
