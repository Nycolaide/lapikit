<script lang="ts">
	import { Button, Icon, Toolbar } from 'lapikit/components';

	let { url, open = $bindable(), ...rest } = $props();

	interface BreadcrumbItem {
		label: string;
		href: string;
		isCurrentPage: boolean;
	}

	function generateBreadcrumbs(url: string): BreadcrumbItem[] {
		const segments = url.replace(/\/$/, '').split('/').filter(Boolean);

		const breadcrumbs: BreadcrumbItem[] = [
			{
				label: 'Home',
				href: '/',
				isCurrentPage: false
			}
		];

		let currentPath = '';

		for (let i = 0; i < segments.length; i++) {
			currentPath += `/${segments[i]}`;
			const isLast = i === segments.length - 1;
			let label = segments[i];

			label = label.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

			const labelMap: Record<string, string> = {};

			label = labelMap[label.toLowerCase()] || label;

			breadcrumbs.push({
				label,
				href: currentPath,
				isCurrentPage: isLast
			});
		}

		return breadcrumbs;
	}

	const breadcrumbs = $derived(generateBreadcrumbs(url));
	const structuredData = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.label,
			item: item.isCurrentPage
				? undefined
				: `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}`
		}))
	});
</script>

<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify(structuredData)}
	</script>
</svelte:head>

<Toolbar {...rest} background="background-primary">
	<Button onclick={() => (open = !open)} icon class="lg:hidden!">
		<Icon icon="mgc_menu_line" />
	</Button>

	<div class="w-full overflow-x-auto">
		<nav class="ml-2 w-max" aria-label="Fil d'Ariane">
			<ol class="breadcrumbs-list text-sm!" itemscope itemtype="https://schema.org/BreadcrumbList">
				{#each breadcrumbs as item, index (item.href)}
					<li
						class="flex items-center"
						itemprop="itemListElement"
						itemscope
						itemtype="https://schema.org/ListItem"
					>
						{#if item.isCurrentPage}
							<span itemprop="name" aria-current="page" class="font-semibold">
								{item.label}
							</span>
						{:else}
							<a href={item.href} itemprop="item" title={item.label} class="hover:underline">
								<span itemprop="name">{item.label}</span>
							</a>
						{/if}
						<meta itemprop="position" content={index + 1} />
						{#if index < breadcrumbs.length - 1}
							<span aria-hidden="true" class="flex">
								<Icon icon="mgc_right_line" />
							</span>
						{/if}
					</li>
				{/each}
			</ol>
		</nav>
	</div>
</Toolbar>

<style>
	.breadcrumbs-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 0.5rem;
	}
</style>
