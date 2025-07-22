<script lang="ts">
	import { t } from '$lib/i18n';
	import { Button, Icon } from 'lapikit/components';
	import { setColorScheme, colorScheme, colorSchemeSystem } from 'lapikit/stores';
	import { capitalize } from 'site-kit/actions';

	let { app }: { app?: boolean } = $props();
</script>

<Button
	icon
	onclick={() =>
		setColorScheme(
			($colorScheme === 'system' && $colorSchemeSystem === 'dark') || $colorScheme === 'dark'
				? 'light'
				: 'dark'
		)}
	density={app ? 'comfortable' : 'default'}
	variant={app ? 'filled' : 'text'}
	aria-label={capitalize($t('navigation.theme_toggle'))}
>
	{#if ($colorScheme === 'system' && $colorSchemeSystem === 'dark') || $colorScheme === 'dark'}
		<Icon icon="mgc_sun_line" />
	{:else}
		<Icon icon="mgc_moon_line" />
	{/if}
</Button>
