<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import type { TextfieldProps } from './types.js';

	let {
		prepend,
		append,
		prependInner,
		appendInner,
		value = $bindable(),
		error = $bindable(),
		type = 'text',
		placeholder,
		counter,
		min,
		max,
		prefix,
		suffix,
		message,
		messagePrefix,
		messageSuffix,
		clearable,
		...rest
	}: TextfieldProps = $props();

	let counterValue: number = $state(0);

	const inputClear = () => {
		value = undefined;
	};

	$effect(() => {
		const valueStr = value?.toString() || '';

		if (valueStr && typeof max === 'number' && max > 0 && valueStr.length > max) {
			// Convertir en string, tronquer, puis reconvertir au type original si c'était un number
			const truncated = valueStr.slice(0, max);
			if (typeof value === 'number') {
				const numValue = Number(truncated);
				value = isNaN(numValue) ? undefined : numValue;
			} else {
				value = truncated;
			}
		}

		counterValue = valueStr.length;
	});
</script>

<div class="kit-textfield" {...rest}>
	{#if prepend}
		<div class="kit-textfield-prepend">
			{@render prepend?.()}
		</div>
	{/if}
	<div class="kit-textfield-control">
		<div class="kit-field">
			{#if prependInner}
				<div class="kit-textfield-prepend-inner">
					{@render prependInner?.()}
				</div>
			{/if}
			<div class="kit-field--field">
				{#if prefix}
					<span class="kit-field--field-prefix">
						<span class="kit-textfield--field-prefix--text">{prefix}</span>
					</span>
				{/if}
				<input
					{type}
					size="1"
					{placeholder}
					bind:value
					{...max && { maxlength: max }}
					{...min && { minlength: min }}
				/>
				{#if suffix}
					<span class="kit-field--field-suffix">
						<span class="kit-textfield--field-suffix--text">{suffix}</span>
					</span>
				{/if}
			</div>
			{#if clearable}
				<div class="kit-textfield-clearable">
					<Icon icon="mgc_close_circle_fill" onclick={() => inputClear()} />
				</div>
			{/if}

			{#if appendInner}
				<div class="kit-textfield-append-inner">
					{@render appendInner?.()}
				</div>
			{/if}
		</div>
	</div>
	{#if append}
		<div class="kit-textfield-append">
			{@render append?.()}
		</div>
	{/if}
	<div class="kit-textfield-message">
		<div class="kit-message">
			{#if messagePrefix}
				<div class="kit-message--prepend">{messagePrefix}</div>
			{/if}
			{#if message}
				<div class="kit-message--message">{message}</div>
			{/if}
			{#if counter || messageSuffix}
				<div class="kit-message--append">
					{#if counter}
						{counterValue}/{max}
					{:else if messageSuffix}
						{messageSuffix}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
