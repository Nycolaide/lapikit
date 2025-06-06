<script lang="ts">
	import { colorScheme, colorSchemeSystem } from 'lapikit/stores';
	import { Button, Icon } from 'lapikit/components';

	let { scheme = $bindable() } = $props();

	$effect(() => {
		if (scheme === undefined && $colorScheme === 'system') {
			scheme = $colorSchemeSystem;
		}
	});
</script>

<Button icon onclick={() => (scheme = scheme === 'dark' ? 'light' : 'dark')}>
	{#if scheme === 'dark'}
		<Icon icon="mgc_sun_line" />
	{:else}
		<Icon icon="mgc_moon_line" />
	{/if}
</Button>
