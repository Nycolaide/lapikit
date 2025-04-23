<script lang="ts">
	import { packageManagers } from '$lib/config';
	import { getHighlighterSingleton } from '$lib/shiki';
	import { copyToClipboard } from 'site-kit/actions';
	import { onMount } from 'svelte';

	type Props = {
		name: string;
		command: string | { pkg: string; command: string }[];
	};

	let { name, command }: Props = $props();
	let ref: null | HTMLElement = $state(null);
	let pkgManager = $state('npm');
	let commandHTML = $state('');
	let copy = $state(false);

	onMount(() => {
		updateCommand();
	});

	$effect(() => {
		if (copy) {
			if (ref?.textContent) {
				copyToClipboard(ref?.textContent);
				copy = true;

				setTimeout(() => {
					copy = false;
				}, 1500);
			}
		}
	});

	const updateCommand = () => {
		if (!command) return;

		let commandString = '';
		if (typeof command === 'string') {
			commandString = command;
		} else {
			command.filter((element) => {
				if (element.pkg === pkgManager) {
					commandString = element.command;
				}
			});
		}

		(async () => {
			const highlighter = await getHighlighterSingleton();
			const html = highlighter.codeToHtml(commandString!, {
				theme: 'vitesse-dark',
				lang: 'typescript'
			});

			commandHTML = html;
		})();
	};
</script>

<div id={name}>
	{#each packageManagers as packageManager (packageManager)}
		<button onclick={() => ((pkgManager = packageManager.name), updateCommand())}>
			{packageManager.name}
		</button>
	{/each}

	<div>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div bind:this={ref}>{@html commandHTML}</div>

		<button onclick={() => (copy = true)}>
			{#if copy}
				copied
			{:else}
				copy code
			{/if}
		</button>
	</div>
</div>
