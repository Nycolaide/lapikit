<script lang="ts">
	import { Appbar, Toolbar } from 'lapikit/components';
	import { fly } from 'svelte/transition';
	import type { GlobalProps } from './types';
	import { breakpoints, viewport } from 'lapikit/stores';

	let { data, url = '' }: GlobalProps = $props();

	// states
	let visible = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		if (data?.npm?.name && $viewport.innerWidth > $breakpoints.md) {
			timeoutId = setTimeout(() => {
				visible = true;
				timeoutId = null;
			}, 200);
		} else {
			visible = false;
		}
	});
</script>

<Appbar
	background="yellow"
	class="sticky top-0 z-100 md:top-[1rem] md:mr-auto md:ml-auto md:w-[95vw]"
	rounded="xl"
>
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
			toolbar content
		</Toolbar>
	</div>
{/if}
