<script lang="ts">
	/**
	 * Sheet component
	 * @description A simple sheet component for experimentation for developers Lapikit. Please don't use it in production.
	 */

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

	let componentClass = $derived(
		useClassName({
			baseClass: 'kit-sheet',
			className,
			sClass,
			classProps
		})
	);

	let componentStyle = $derived(
		useStyles({
			styleAttr,
			sStyle,
			styleProps
		})
	);
</script>

<div class={componentClass} style={componentStyle} {...restProps}>
	{@render children()}
</div>

<style>
	.kit-sheet {
		border: 1px solid rgb(0, 0, 0);
	}
</style>
