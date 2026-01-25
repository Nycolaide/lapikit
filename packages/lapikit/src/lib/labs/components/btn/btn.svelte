<script lang="ts">
	import { useClassName, useStyles } from '$lib/labs/components/btn/btn.svelte.js';
	import { splitSyntheticProps } from '$lib/labs/utils/index.js';

	let {
		class: className,
		style: styleAttr,
		children,
		's-class': sClass,
		's-style': sStyle,
		...rest
	} = $props();

	let { classDirectiveProps, styleDirectiveProps, regularProps } = $derived(
		splitSyntheticProps(rest as Record<string, unknown>)
	);

	let finalClass = $derived(
		useClassName({
			baseClass: 'kit-button',
			className,
			sClass,
			classDirectiveProps
		}).value
	);

	let finalStyle = $derived(
		useStyles({
			styleAttr,
			sStyle,
			styleDirectiveProps
		}).value
	);
</script>

<button class={finalClass} style={finalStyle} {...regularProps}>
	{@render children()}
</button>

<style>
	.kit-btn {
		border: 1px solid rgb(0, 0, 0);
	}
</style>
