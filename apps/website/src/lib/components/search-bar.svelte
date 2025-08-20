<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { t } from '$lib/i18n';

	import { capitalize } from 'site-kit/actions';
	import { deviceUsed } from '$lib/stores/app.js';
	import { Button, Chip, Icon } from 'lapikit/components';

	let {
		app,
		open = $bindable(false)
	}: {
		app?: boolean;
		open?: boolean;
	} = $props();

	// states
	let placeholder: string = $state($t('homepage.search_placeholder'));
	let displayed: string = $state('');
	let indexPlaceholder: number = $state(0);
	let speed: number = $state(50);

	onMount(() => {
		if (browser) {
			typewrite();
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			open = true;
		}
	}

	function typewrite() {
		if (indexPlaceholder < placeholder.length) {
			displayed += placeholder[indexPlaceholder];
			indexPlaceholder++;
			setTimeout(typewrite, speed);
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown);
		}
	});
</script>

{#if app}
	<div class="relative flex items-center gap-2">
		<div class="effect-animation--focus"></div>
		<img class="rabbit" src="images/rabbit.png" alt="Rabbit" />
		<Button
			id="search-bar--app"
			class="w-full"
			onclick={() => (open = true)}
			aria-label={capitalize($t('navigation.search_bar.button'))}
			rounded="xl"
		>
			{#snippet prepend()}
				<Icon icon="mgc_search_2_line" />
			{/snippet}

			<p class="leading-none opacity-70">
				<span class="typewriter">{displayed}</span>
				<span class="cursor">|</span>
			</p>

			{#snippet append()}
				<Chip size="sm" density="compact" rounded="full">
					{$deviceUsed === 'apple' ? '⌘' : 'ctrl'}
				</Chip>
				<Chip size="sm" density="compact" rounded="full">K</Chip>
			{/snippet}
		</Button>
	</div>
{:else}
	<Button
		class="display-mobile"
		icon
		onclick={() => (open = true)}
		aria-label={capitalize($t('navigation.search_bar.button'))}
		variant="text"
	>
		<Icon icon="mgc_search_2_line" />
	</Button>

	<Button
		class="hidden-mobile"
		onclick={() => (open = true)}
		aria-label={capitalize($t('navigation.search_bar.button'))}
	>
		{#snippet prepend()}
			<Icon icon="mgc_search_2_line" />
		{/snippet}
		{capitalize($t(`navigation.search_bar.button`))}
		{#snippet append()}
			<Chip size="sm" density="compact" rounded="full">
				{$deviceUsed === 'apple' ? '⌘' : 'ctrl'}
			</Chip>
			<Chip size="sm" density="compact" rounded="full">K</Chip>
		{/snippet}
	</Button>
{/if}

<style>
	:global(#search-bar--app .kit-button-content) {
		width: 100%;
		text-align: start;
		justify-content: flex-start;
	}

	.effect-animation--focus {
		content: '';
		width: 100%;
		filter: blur(0.3rem);
		background: linear-gradient(var(--gradient-angle), blue, purple, red, orange);
		animation: rotation 5s linear infinite;
		position: absolute;
		z-index: 0;
		height: 100%;
		border-radius: var(--kit-radius-xl);
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

	.cursor {
		display: inline-block;
		animation: blink 0.85s infinite;
	}

	.rabbit {
		position: absolute;
		width: 39px;
		z-index: 1;
		top: -32px;
		right: 75px;
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}
</style>
