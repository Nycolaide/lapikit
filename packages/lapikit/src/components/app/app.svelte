<script lang="ts">
	import type { AppProps } from './types.js';
	let { children }: AppProps = $props();
</script>

<svelte:head>
	<script>
		{
			const local = localStorage.getItem('@lapikit/theme');
			const localParse = local ? JSON.parse(local) : undefined;
			if (localParse) {
				document.documentElement.classList.add(
					localParse.colorScheme === 'auto'
						? window.matchMedia('(prefers-color-scheme: dark)').matches
							? 'dark'
							: 'light'
						: localParse.colorScheme
				);
			}
		}
	</script>
</svelte:head>

<p>application</p>
{@render children?.()}
