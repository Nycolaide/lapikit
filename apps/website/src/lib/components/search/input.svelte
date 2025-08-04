<script lang="ts">
	import { t } from '$lib/i18n';
	import { Icon, Textfield } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { onDestroy } from 'svelte';

	let { value = $bindable(undefined), open }: { value?: string | undefined; open?: boolean } =
		$props();

	let textfieldElement = $state<HTMLElement>();

	$effect(() => {
		if (open && textfieldElement) {
			setTimeout(() => {
				const input = textfieldElement?.querySelector('input') as HTMLInputElement;
				input?.focus();
			}, 100);
		}
	});

	onDestroy(() => {
		//reset value
		value = undefined;
	});
</script>

<div id="search-bar" class="relative flex items-center gap-2">
	<div class="effect-animation--focus"></div>
	<Textfield
		bind:ref={textfieldElement}
		bind:value
		clearable
		placeholder={capitalize($t('navigation.search_bar.placeholder'))}
	>
		{#snippet appendInner()}
			<Icon icon="mgc_search_line" />
		{/snippet}
	</Textfield>
</div>

<style>
	.effect-animation--focus {
		width: 100%;
		filter: blur(0.3rem);
		background: linear-gradient(var(--gradient-angle), blue, purple, red, orange);
		animation: rotation 5s linear infinite;
		position: absolute;
		z-index: 0;
		height: 70%;
		border-radius: var(--radius-effect);
		top: -1px;
	}

	@property --gradient-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes rotation {
		0% {
			--gradient-angle: 0deg;
		}
		100% {
			--gradient-angle: 360deg;
		}
	}
</style>
