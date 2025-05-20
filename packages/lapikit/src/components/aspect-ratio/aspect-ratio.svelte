<script lang="ts">
	import type { AspectRationProps } from './types.js';
	let { children, aspectRatio, inline, ...rest }: AspectRationProps = $props();

	let paddingBottom = $state(0);

	$effect.pre(() => {
		if (aspectRatio) {
			const [width, height] = aspectRatio.split('/').map(Number);
			paddingBottom = (height / width) * 100;
		}
	});

	$effect(() => {
		if (aspectRatio) {
			const [width, height] = aspectRatio.split('/').map(Number);
			paddingBottom = (height / width) * 100;
		}
	});
</script>

<div {...rest} class={['kit-aspect-ratio', inline && 'kit-aspect-ratio--inline', rest.class]}>
	<div class="kit-aspect-ratio--sizer" style={`padding-bottom: ${paddingBottom}%;`}></div>
	{@render children?.()}
</div>

<style>
	.kit-aspect-ratio {
		display: flex;
		flex: 1 0 auto;
		max-height: 100%;
		max-width: 100%;
		overflow: hidden;
		position: relative;
	}

	.kit-aspect-ratio--inline {
		display: inline-flex;
		flex: 0 0 auto;
	}

	.kit-aspect-ratio--sizer {
		flex: 1 0 0px;
		transition: padding-bottom 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		pointer-events: none;
	}
</style>
