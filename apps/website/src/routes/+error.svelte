<script lang="ts">
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { RainingAnimation } from '$animations';
	import { Button, Icon } from 'lapikit/components';

	// modules
	import { Header, Footer } from '$components';

	// assets
	import LapinosaureSad from '$lib/images/lapinosaure/lapinosaure-sad.webp?enhanced';
	import LapinosaureVerySad from '$lib/images/lapinosaure/lapinosaure-very-sad.webp?enhanced';
	import Puddle from '$lib/images/assets/puddle-of-water.webp?enhanced';

	let { data } = $props();
</script>

<svelte:head>
	<title>{page?.status === 404 ? '404 Page not found' : `Error ${page?.status}`}</title>
	<meta name="description" content="Oops! Something went wrong." />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<Header npm={data.npm} isHome={false} />

<div
	class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
>
	<div
		class="no-select relative mx-auto flex w-[290px] items-center justify-center transition-all sm:w-[520px] lg:w-[720px]"
	>
		<enhanced:img
			src={LapinosaureVerySad}
			alt="lapinosaure"
			class="absolute -left-8 top-[5.5rem] z-10 w-[50px] sm:top-[8.5rem] sm:w-[90px] lg:top-[11.5rem] lg:w-[120px]"
		/>

		<RainingAnimation
			class="absolute -top-[2.6rem] ml-[5rem] w-[120px] sm:ml-[8rem] sm:w-[160px] lg:ml-[12rem] lg:w-[220px]"
		/>

		<p
			class="text-[9rem] font-bold sm:text-[15rem] lg:text-[20rem]"
			style:color="var(--kit-accent-primary)"
		>
			{page?.status}
		</p>
		<enhanced:img
			src={LapinosaureSad}
			alt="lapinosaure"
			class="absolute right-0 top-[5.5rem] z-10 w-[50px] scale-x-[-1] sm:top-[8.5rem] sm:w-[90px] lg:top-[11.5rem] lg:w-[120px]"
		/>
		<enhanced:img
			src={Puddle}
			alt="puddle"
			class="absolute bottom-[1.5rem] left-[5rem] w-[150px] sm:bottom-[2.5rem] sm:left-[8rem] sm:w-[200px] lg:bottom-[3.5rem] lg:left-[12rem] lg:w-[250px]"
		/>
	</div>
	<div class="flex flex-col items-center text-center">
		{#if page?.status === 404}
			<p class="max-w-xl sm:text-xl">
				Oops, Lapinosaure is lost. Some say that the path he wanted to take exists, but in the end
				it's just a legend. Help him find his way back.
			</p>
		{:else}
			<div class="max-w-xl text-center text-xl">
				<h1>{page?.status}</h1>
				<p>{page?.error?.message}</p>
			</div>
		{/if}
		<div class="flex-col! sm:flex-row! flex justify-center sm:gap-4">
			<Button
				onclick={() => history.back()}
				background="accent-primary"
				color="white"
				rounded="full"
				class="px-6! mt-4"
				size={{ base: 'md', md: 'lg' }}
			>
				{#snippet prepend()}
					<Icon icon="mgc_left_fill" />
				{/snippet}

				{$t('error.back')}
			</Button>
			<Button
				href="/"
				color="accent-primary"
				rounded="full"
				class="px-6! mt-4"
				size={{ base: 'md', md: 'lg' }}
				variant="outline"
			>
				{$t('error.return')}
			</Button>
		</div>
	</div>
</div>

<Footer url={data.url_internal} />
