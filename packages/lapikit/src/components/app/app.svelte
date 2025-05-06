<script lang="ts">
	import { BROWSER } from 'esm-env';
	import type { AppProps } from './types.js';
	import { updateThemeStore } from '$lib/stores/index.js';
	let { children, ...rest }: AppProps = $props();

	$effect.pre(() => {
		if (!BROWSER) return;
		const local = localStorage.getItem('@lapikit/theme');
		console.log('DARKMODE local', local);
		if (local !== null) updateThemeStore(local as 'dark' | 'light' | 'auto');
	});
</script>

<p>application</p>
<div {...rest}>
	{@render children?.()}
</div>
