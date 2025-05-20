<script lang="ts">
	import { t, locale, locales } from '$lib/i18n';
	import { Component } from 'site-kit';
	import { Btn } from 'lapikit/components';

	let time: string = $state('');
	let search = $state('');
	let results = $state<{ title: string; description: string }[]>([]);
	let timeout: NodeJS.Timeout;

	$effect(() => {
		const lang = $locale;
		time = new Date().toLocaleDateString(lang, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	function handleInput(event: Event) {
		search = (event.target as HTMLInputElement).value;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fetchResults();
		}, 300);
	}

	async function fetchResults() {
		if (search.trim() === '') {
			results = [];
			return;
		}

		try {
			const res = await fetch('/api/content');
			const data = await res.json();

			if (data.length === 0) {
				results = [];
				return;
			} else {
				results = data.filter(
					(item: { title: string; description: string }) =>
						item.title.toLowerCase().includes(search.toLowerCase()) ||
						item.description.toLowerCase().includes(search.toLowerCase())
				);
			}
		} catch (error) {
			console.error('Error while fetching:', error);
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Component />

<p>
	<select bind:value={$locale} aria-label="lang">
		{#each locales as l (l)}
			<option value={l}>{l}</option>
		{/each}
	</select>
</p>

<h1>{$t('homepage.title')}!</h1>
<p>{$t('homepage.welcome', { name: 'Jane Doe' })}!</p>
<p>{$t('homepage.time', { time })}!</p>

<input placeholder="search" bind:value={search} oninput={handleInput} />
{#each results as result (result)}
	<div>
		<p>{result?.title}</p>
		<p>{result?.description}</p>
	</div>
{/each}

<h2>Btn</h2>

<Btn>button default</Btn>
<br />
<Btn size="sm">button sm</Btn>
<br />
<Btn size={{ xs: 'sm', md: 'lg', xl: 'xs' }} class="demo">button media</Btn>
