<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import type { TextfieldProps } from './types.js';

	let {
		prepend,
		append,
		prependInner,
		appendInner,
		value = $bindable(),
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
		persistentClear,
		disabled,
		error,
		errorMessage,
		persistentMessage,
		hideSpinButtons, // only type="number"
		readonly,
		...rest
	}: TextfieldProps = $props();

	let counterValue: number = $state(0);
	let displayMessage: boolean = $state(false);
	let displayClear: boolean = $state(false);

	const inputClear = () => {
		value = undefined;
	};

	const handleFocus = () => {
		if (!error && !persistentMessage) displayMessage = true;
	};

	const handleBlur = () => {
		if (!error && !persistentMessage) displayMessage = false;
	};

	$effect(() => {
		if (persistentClear) displayClear = true;
		if (persistentMessage) displayMessage = true;
		else if (error) displayMessage = true;
		else if (!error) displayMessage = false;
	});

	$effect(() => {
		const valueStr = value?.toString() || '';

		if (valueStr && typeof max === 'number' && max > 0 && valueStr.length > max) {
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

	$effect(() => {
		if (!persistentClear) {
			if (value) displayClear = true;
			else displayClear = false;
		}
	});
</script>

{errorMessage}
<div
	{...rest}
	class={[
		'kit-textfield',
		disabled && 'kit-textfield--disabled',
		readonly && 'kit-textfield--readonly',
		error && 'kit-textfield--error',
		type === 'number' && hideSpinButtons && 'kit-textfield--hide-spin-buttons',
		rest.class
	]}
>
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
					onfocus={handleFocus}
					onblur={handleBlur}
					{...max && { maxlength: max }}
					{...min && { minlength: min }}
					{...disabled && { disabled: true }}
					{...readonly && { readonly: true }}
				/>
				{#if suffix}
					<span class="kit-field--field-suffix">
						<span class="kit-textfield--field-suffix--text">{suffix}</span>
					</span>
				{/if}
			</div>
			{#if clearable}
				<div
					class={['kit-textfield-clearable', displayClear && 'kit-textfield-clearable--visible']}
				>
					<Icon icon="mgc_close_circle_fill" onclick={() => inputClear()} />
				</div>
			{/if}

			{#if appendInner}
				<div class="kit-textfield-append-inner">
					{@render appendInner?.()}
				</div>
			{/if}

			<div class="kit-textfield-outline"></div>
		</div>
	</div>
	{#if append}
		<div class="kit-textfield-append">
			{@render append?.()}
		</div>
	{/if}

	<div class={['kit-textfield-message', displayMessage && 'kit-textfield-message--visible']}>
		<div class={['kit-message', error && 'kit-message--message-error']}>
			{#if messagePrefix}
				<div class="kit-message--prepend">{messagePrefix}</div>
			{/if}
			{#if message || error}
				<div class="kit-message--message">
					{error ? errorMessage || message : message}
				</div>
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
