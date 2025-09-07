<script lang="ts">
	import { t } from '$lib/i18n';
	import { Button, Icon } from 'lapikit/components';
	import { useTheme, theme } from 'lapikit/stores';
	import { capitalize } from 'site-kit/actions';

	let { app }: { app?: boolean } = $props();
</script>

<Button
	icon
	onclick={() => useTheme($theme === 'light' ? 'dark' : 'light')}
	density={app ? 'comfortable' : 'default'}
	variant={app ? 'filled' : 'text'}
	aria-label={capitalize($t('navigation.theme_toggle'))}
>
	{#if $theme !== 'light'}
		<Icon icon="mgc_sun_line" />
	{:else}
		<Icon icon="mgc_moon_line" />
	{/if}
</Button>
