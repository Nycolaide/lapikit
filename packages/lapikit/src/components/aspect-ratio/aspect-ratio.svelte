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
