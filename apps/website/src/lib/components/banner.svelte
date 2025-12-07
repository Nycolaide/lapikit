<script lang="ts">
	import { Button, Icon, Toolbar } from 'lapikit/components';
	import { onMount } from 'svelte';

	let { banner, ...rest } = $props();

	// states
	let display: boolean = $state(false);

	onMount(() => {
		const now = new Date();
		if (now < new Date(banner.start) || now > new Date(banner.end)) {
			display = false;
		} else {
			display = true;
		}
	});
</script>

{#if display}
	<Toolbar
		classContent="justify-center"
		{...rest}
		background="accent-primary"
		color="white"
		rounded="0"
	>
	 {#if banner?.href}
		<a href={banner?.href} target={!banner?.href.includes('lapikit') && '_blank'} class="flex items-center">
			<div class="text-sm">
				<span class="max-md:hidden">{banner.content.lg}</span>
				<span class="min-md:hidden">{banner.content.sm}</span>
			</div>
			<Button
				icon
				density="compact"
				href={banner.href}
				target={!banner.href.includes('lapikit') && '_blank'}
				rounded="full"
				variant="text"
				size="sm"
				class="ml-2"
			>
				<Icon icon="mgc_arrow_right_fill" />
			</Button>
		</a>
		{:else}
			<div class="text-sm">
				<span class="max-md:hidden">{banner.content.lg}</span>
				<span class="min-md:hidden">{banner.content.sm}</span>
			</div>
		{/if}
	</Toolbar>
{/if}
