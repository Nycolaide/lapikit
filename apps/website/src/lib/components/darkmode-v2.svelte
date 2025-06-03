<script lang="ts">
	import { Button, Icon } from 'lapikit/components';
	import { setColorScheme, colorScheme, colorSchemeSystem } from 'lapikit/stores';
</script>

<Button
	icon
	onclick={() =>
		setColorScheme(
			($colorScheme === 'system' && $colorSchemeSystem === 'dark') || $colorScheme === 'dark'
				? 'light'
				: 'dark'
		)}
>
	{#if ($colorScheme === 'system' && $colorSchemeSystem === 'dark') || $colorScheme === 'dark'}
		<Icon icon="mgc_sun_line" />
	{:else}
		<Icon icon="mgc_moon_line" />
	{/if}
</Button>
