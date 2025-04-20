<script lang="ts">
	import { t, locale, locales } from '$lib/i18n';
	import { Component } from 'site-kit';
	import { helloWorld } from 'lapikit';
	import { onMount } from 'svelte';

	let time: string = $state('');

	onMount(() => {
		helloWorld();
	});

	$effect(() => {
		const lang = $locale;
		time = new Date().toLocaleDateString(lang, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Component />

<p>
	<select bind:value={$locale}>
		{#each locales as l (l)}
			<option value={l}>{l}</option>
		{/each}
	</select>
</p>

<h1>{$t('homepage.title')}!</h1>
<p>{$t('homepage.welcome', { name: 'Jane Doe' })}!</p>
<p>{$t('homepage.time', { time })}!</p>
