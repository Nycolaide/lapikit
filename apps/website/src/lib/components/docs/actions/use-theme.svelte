<script lang="ts">
	import { Button, Icon } from 'lapikit/components';
	import { useTheme } from 'lapikit/actions';
	import { theme } from 'lapikit/stores';
</script>

<Button icon onclick={() => useTheme($theme === 'light' ? 'dark' : 'light')}>
	{#if $theme !== 'light'}
		<Icon icon="mgc_sun_line" />
	{:else}
		<Icon icon="mgc_moon_line" />
	{/if}
</Button>
