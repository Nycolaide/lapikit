<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { type SClassProp, type SStyleProp, splitSyntheticProps } from '../utils/props.js';
	import { useClassName, useStyles } from './Button.svelte.js';

	interface Props extends Omit<HTMLButtonAttributes, 'class' | 'style' | 'children'> {
		children: Snippet;
		's-class'?: SClassProp;
		's-style'?: SStyleProp;
		class?: string;
		style?: string;
		background?: string;
		href?: string;
		target?: string;
	}

	let {
		children,
		class: className,
		style: styleAttr,
		's-class': sClass,
		's-style': sStyle,
		background,
		href,
		...allProps
	}: Props = $props();

	let { classDirectiveProps, styleDirectiveProps, regularProps } = $derived(
		splitSyntheticProps(allProps as Record<string, unknown>)
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

{#if href}
	<a {...regularProps} {href} class={finalClass} style={finalStyle} style:background>
		{@render children()}
	</a>
{:else}
	<button {...regularProps} class={finalClass} style={finalStyle} style:background>
		{@render children()}
	</button>
{/if}

<style>
	.kit-button {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		border: none;
		background: #4285f4;
		color: white;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.kit-button:hover {
		background: #3367d6;
	}

	.kit-button:active {
		transform: scale(0.98);
	}

	.kit-button:focus-visible {
		outline: 2px solid #4285f4;
		outline-offset: 2px;
	}

	.kit-button.is-active {
		background: #097200 !important;
	}
</style>
