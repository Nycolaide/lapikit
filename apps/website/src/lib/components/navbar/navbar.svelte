<script lang="ts">
	import { page } from '$app/state';
	import type { NavBarProps } from './types';

	// components
	import Global from './global.svelte';

	let { variant = 'app' }: NavBarProps = $props();
</script>

{#if variant}
	<Global url={page.url.pathname} />
{/if}
