<script lang="ts">
	import type { SpacerProps } from './types.js';

	let { is = 'div', ...rest }: SpacerProps = $props();
</script>

<svelte:element this={is} {...rest} class={['kit-spacer', rest.class]}> </svelte:element>
