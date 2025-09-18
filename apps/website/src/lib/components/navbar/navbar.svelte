<script lang="ts">
	import { page } from '$app/state';
	import type { NavBarProps } from './types';

	// components
	import Global from './global.svelte';
	import { PUBLIC_DEV_MODE } from '$env/static/public';

	let { variant = 'app' }: NavBarProps = $props();
</script>

{#if PUBLIC_DEV_MODE == 'true' && variant === 'app'}
	<Global url={page.url.pathname} />
{/if}
