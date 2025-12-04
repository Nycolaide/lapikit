<script lang="ts">
	import { Icon, Toolbar } from 'lapikit/components';

	let { url, headings, ...rest } = $props();
</script>

{#if headings.length > 0}
	<div class="bg-background-primary sticky top-[112px] z-10 text-sm" {...rest}>
		<Toolbar classContent="opacity-70" class="p-0!" background="transparent">
			<Icon icon="mgc_floating_dust_line" class="mr-2" />
			<span>On this page</span>
		</Toolbar>
		<div class="max-h-[calc(100vh_-_200px)] overflow-y-auto">
			<ul class="opacity-70">
				{#each headings as heading (heading.id)}
					<li class="mb-2" class:mr-2={heading.level === 2} class:ml-4={heading.level === 3}>
						<a href={`#${heading.id}`} class="hover:underline">
							{#if url === '/docs/changelog'}
								{#if !heading.text.includes('-')}
									{heading.text.replaceAll('[', 'v').replaceAll(']', '')} - In development
								{:else}
									{heading.text.replaceAll('[', 'v').replaceAll(']', '')}
								{/if}
							{:else}
								{heading.text}
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
