<script lang="ts">
	import type { NavBarProps } from './types';

	// components
	import Global from './global.svelte';
	import { PUBLIC_DEV_MODE } from '$env/static/public';

	let { variant = 'app', ...rest }: NavBarProps = $props();
</script>

{#if PUBLIC_DEV_MODE == 'true' && variant === 'app'}
	<Global {...rest} />
{/if}
