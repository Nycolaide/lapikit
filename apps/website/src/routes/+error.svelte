<script lang="ts">
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { Button, Icon } from 'lapikit/components';

	// modules
	import Head from '$lib/components/head.svelte';

	// assets
	import LapikitLogoError from '$lib/images/lapikit-error.webp?enhanced';
</script>

<Head
	title={page?.status === 404 ? $t('error.404.headline') : `Error ${page?.status}`}
	description={$t('error.metadescription')}
	index="noindex, follow"
/>

<div class="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
	<div>
		<enhanced:img id="lapikit-logo" src={LapikitLogoError} alt="Lapikit logo error" />
	</div>
	<div>
		{#if page?.status === 404}
			<h1 class="text-2xl font-bold">{$t('error.404.title')}</h1>
			<p class="max-w-md">
				{$t('error.404.message')}
			</p>
		{:else}
			<h1>{page?.status}</h1>
			<p>{page?.error?.message}</p>
		{/if}

		<div class="mt-4">
			<Button href="/" background="accent-primary">
				{$t('error.return')}

				{#snippet append()}
					<Icon icon="mgc_right_fill" />
				{/snippet}
			</Button>
		</div>
	</div>
</div>

<style>
	#lapikit-logo {
		width: 30vw;
		max-width: 150px;
	}
</style>
