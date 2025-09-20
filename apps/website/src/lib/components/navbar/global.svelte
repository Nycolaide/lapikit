<script lang="ts">
	import { Appbar, Button, Dropdown, Icon, Spacer, Toolbar } from 'lapikit/components';
	import { fly } from 'svelte/transition';
	import type { GlobalProps } from './types';
	import { breakpoints, viewport } from 'lapikit/stores';

	let { data, url = '' }: GlobalProps = $props();

	// assets
	import LapikitLogo from '$lib/images/lapikit.webp?enhanced';

	// states
	let visible = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let lastPublish = $state('');

	// refs
	let refMenuDocs = $state(null);

	$effect(() => {
		console.log('data in navbar', data);
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		if (data?.npm && data?.github && $viewport.innerWidth > $breakpoints.md) {
			timeoutId = setTimeout(() => {
				visible = true;
				timeoutId = null;
			}, 200);
		} else {
			visible = false;
		}
	});

	$effect(() => {
		if (data?.npm) {
			lastPublish = new Intl.DateTimeFormat('en-US', {
				dateStyle: 'short',
				timeStyle: 'short'
			}).format(new Date(data.npm.lastPublished));
		}
	});
</script>

<Appbar
	background="yellow"
	class="sticky top-0 z-100 md:top-[1rem] md:mr-auto md:ml-auto md:w-[95vw]"
	rounded="xl"
>
	<a href="/">
		<div class="flex items-center gap-2">
			<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" />

			<h1 class="text-2xl font-bold">Lapikit</h1>
		</div>
	</a>

	<Button>Components</Button>
	<Button>Store</Button>
	<Button>Actions</Button>

	<Spacer />

	<Dropdown>
		{#snippet activator(model)}
			<Button bind:ref={refMenuDocs} onclick={() => model.toggle(refMenuDocs)}>
				About us
				<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
			</Button>
		{/snippet}
		<div>
			<ul>
				<li>Merch</li>
				<li>Discord</li>
				<li>NPM</li>
			</ul>
		</div>
	</Dropdown>
	<Button>GitHub</Button>
	<Button>Discover all documentations</Button>

	{url}

	<label>
		<input type="checkbox" bind:checked={visible} />
		visible
	</label>
</Appbar>

{#if visible}
	<div
		transition:fly={{ y: -20, duration: 500 }}
		class="fixed top-[4rem] left-[6vw] z-80 w-[88vw]! max-md:hidden"
	>
		<Toolbar classContent="mt-[13px]" background="green" rounded="xl" density="compact">
			<Spacer />
			<div class="text-center">
				{data?.npm?.name} v{data?.npm?.version} • {data?.npm?.downloads || 0} downloads/month
				{#if data?.github}
					• {data.github.subscribers_count || 0} subscribers on GitHub
				{/if}
				{lastPublish}
			</div>
			<Spacer />
		</Toolbar>
	</div>
{/if}

<style>
	#lapikit-logo {
		width: 40px;
	}
</style>
