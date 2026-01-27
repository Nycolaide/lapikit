<script lang="ts">
	import { useClassName, useStyles } from '$lib/labs/utils/index.js';
	import { makeComponentProps } from '$lib/labs/compiler/mapped-code.js';

	let {
		class: className,
		style: styleAttr,
		children,
		's-class': sClass,
		's-style': sStyle,
		...rest
	} = $props();

	let { classProps, styleProps, restProps } = $derived(
		makeComponentProps(rest as Record<string, unknown>)
	);

	let finalClass = $derived(
		useClassName({
			baseClass: 'kit-btn',
			className,
			sClass,
			classProps
		}).value
	);

	let finalStyle = $derived(
		useStyles({
			styleAttr,
			sStyle,
			styleProps
		}).value
	);
</script>

<button class={finalClass} style={finalStyle} {...restProps}>
	{@render children()}
</button>

<style>
	.kit-btn {
		border: 1px solid rgb(0, 0, 0);
	}
</style>
