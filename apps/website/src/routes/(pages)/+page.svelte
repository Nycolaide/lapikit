<script lang="ts">
	import { scrollAnimation } from '$animations';

	// modules
	import Hero from './_home/hero.svelte';
	import Integration from './_home/integration.svelte';
	import Process from './_home/process.svelte';
	import SupportLapikit from './_home/support-lapikit.svelte';
	import UseLapikit from './_home/use-lapikit.svelte';
	import Author from './_home/author.svelte';
	import Counter from './_home/counter.svelte';
	import Explore from './_home/explore.svelte';
	import Features from './_home/features.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Lapikit • Svelte Components Library</title>
	<meta
		name="description"
		content="Discover Lapikit, a component library optimized for Svelte. Quick to integrate, simple to style, and designed for front-end developers"
	/>
</svelte:head>

<div class="home">
	<section id="hero" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<Hero />
	</section>

	<section
		id="discover-lapikit-integration"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
		class="z-1 relative"
	>
		<Integration />
	</section>

	<section
		id="simply-process-to-use-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
		class="mb-[48px] h-fit text-center"
	>
		<Process counter={data.counter} />
	</section>

	<section
		id="discover-features-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
	>
		<Features />
	</section>

	<section
		id="author-and-counter-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
	>
		<Author url={data.url_internal} />
		<Counter url={data.url_internal} npm={data.npm} github={data.github} />
	</section>

	<section id="go-to-use-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<UseLapikit url={data.url_internal} />
	</section>

	<section
		id="sponsor-and-support-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
	>
		<SupportLapikit url={data.url_internal} />
	</section>

	<section id="lapikit-is-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div>
			<div class="grid gap-4 text-center">
				<p class="text-[1rem] font-bold opacity-15 sm:text-[1.25rem] md:text-[1.75rem]">
					It's not magic, it's Lapikit
				</p>
			</div>
		</div>
	</section>

	<section id="enter-in-lapikit-core" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<Explore />
	</section>
</div>
