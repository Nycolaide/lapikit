<script lang="ts">
	import { Appbar, Toolbar } from 'lapikit/components';
	import { fly } from 'svelte/transition';
	import type { GlobalProps } from './types';

	let { url = '' }: GlobalProps = $props();
	let visible = $state(true);
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
		class="fixed z-80 md:top-[4rem] md:left-[6vw] md:w-[88vw]!"
	>
		<Toolbar class=" " classContent="mt-[13px]" background="green" rounded="xl" density="compact">
			toolbar content
		</Toolbar>
	</div>
{/if}
