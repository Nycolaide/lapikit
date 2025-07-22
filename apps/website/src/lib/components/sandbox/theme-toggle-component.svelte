<script lang="ts">
	import { t } from '$lib/i18n';
	import { colorScheme, colorSchemeSystem } from 'lapikit/stores';
	import { Button, Icon } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';

	let { scheme = $bindable() } = $props();

	$effect(() => {
		if (scheme === undefined && $colorScheme === 'system') {
			scheme = $colorSchemeSystem;
		}
	});
</script>

<Button
	icon
	onclick={() => (scheme = scheme === 'dark' ? 'light' : 'dark')}
	aria-label={capitalize($t('docs.sandbox.actions.theme-toggle'))}
>
	{#if scheme === 'dark'}
		<Icon icon="mgc_sun_line" />
	{:else}
		<Icon icon="mgc_moon_line" />
	{/if}
</Button>
