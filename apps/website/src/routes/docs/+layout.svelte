<script lang="ts">
	import { t, locale, locales } from '$lib/i18n';
	import { Btn } from 'lapikit/components';
	import { Drawer, Component, Darkmode } from 'site-kit';
	import { colorScheme, setColorScheme } from 'lapikit/stores';
	let { children } = $props();

	let open = $state(false);
	let openMenu = $state(false);
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

<Drawer bind:open>
	{#snippet navigation()}
		<p>Navigation</p>
	{/snippet}

	<button onclick={() => (openMenu = !openMenu)}>open Menu</button>
	{#if openMenu}
		<nav>
			<a href="/">Home</a>
			<a href="/docs/sample">Sample</a>
			<a href="/docs/button">Button</a>
			<a href="/docs/icon">Icon</a>
			<a href="/docs/dropdown">Dropdown</a>
			<a href="/docs/popover">Popover</a>
			<a href="/docs/tooltip">Tooltip</a>
			<a href="/docs/dialog">Dialog</a>
			<a href="/docs/separator">Separator</a>
			<a href="/docs/modal">Modal</a>
			<a href="/docs/list">List</a>
			<a href="/docs/avatar">Avatar</a>
			<a href="/docs/accordion">Accordion</a>
			<a href="/docs/aspect-ratio">Aspect Ratio</a>
			<a href="/docs/alert">Alert</a>
			<a href="/docs/chip">Chip</a>
			<a href="/docs/card">Card</a>
			<a href="/docs/toolbar">Toolbar</a>
			<a href="/docs/appbar">Appbar</a>
			<Darkmode scheme={$colorScheme} handle={setColorScheme} />
		</nav>
	{/if}

	<p>{$colorScheme}</p>

	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
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

	<div class="flex lg:flex">demo</div>

	<button onclick={() => (open = !open)}>open drawer</button>

	{@render children?.()}
</Drawer>
