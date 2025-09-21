<script lang="ts">
	import { Appbar, Button, Icon, Spacer } from 'lapikit/components';
	import { fly } from 'svelte/transition';
	import { breakpoints, viewport } from 'lapikit/stores';

	interface GlobalProps {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: any;
	}

	let { data }: GlobalProps = $props();

	// assets
	import LapikitLogo from '$lib/images/lapikit.webp?enhanced';

	import IndicatorBar from './indicator-bar.svelte';
	import { githubUrl } from '$lib/config';

	// states
	let visible = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let scrollY = $state(0);
	let shape = $state('0');

	$effect(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		if (data?.npm && data?.github && $viewport.innerWidth > $breakpoints.md && scrollY <= 50) {
			timeoutId = setTimeout(() => {
				visible = true;
				timeoutId = null;
			}, 200);
		} else {
			visible = false;
		}
	});

	$effect(() => {
		if ($viewport.innerWidth > $breakpoints.md) {
			shape = 'xl';
		} else {
			shape = '0';
		}
	});

	$effect(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});
</script>

<Appbar
	background="background-secondary"
	class="sticky top-0 z-100 md:top-[1rem] md:mr-auto md:ml-auto md:w-[95vw]"
	classContent="gap-2"
	rounded={shape}
>
	<a href="/">
		<div class="flex items-center gap-2">
			<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" />
			<h1 class="text-2xl font-bold">Lapikit</h1>
		</div>
	</a>

	<Spacer />

	<Button icon variant="text" href={githubUrl} target="_blank" aria-label="GitHub">
		<Icon icon="mgc_github_line" />
	</Button>
	<Button href="/docs/introduction" size="lg" rounded="lg" background="accent-primary" color="white"
		>Discover all documentation</Button
	>
</Appbar>

{#if visible}
	<div
		transition:fly={{ y: -20, duration: 500 }}
		class="fixed top-[4rem] left-[6vw] z-80 w-[88vw]! max-md:hidden"
	>
		<IndicatorBar {data} />
	</div>
{/if}

<style>
	#lapikit-logo {
		width: 40px;
	}
</style>
