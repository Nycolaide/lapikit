<script lang="ts">
	import { packageManagers } from '$lib/config';
	import { getHighlighterSingleton } from '$lib/shiki';
	import { Button, Icon } from 'lapikit/components';
	import { copyToClipboard } from 'site-kit/actions';
	import { onMount } from 'svelte';

	type Props = {
		name: string;
		command: string | { pkg: string; command: string | string[] }[];
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
					if (Array.isArray(element.command)) {
						commandString = element.command.join('\n');
					} else {
						commandString = element.command;
					}
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

<div id={name} class="lapikit-command-line relative mt-6 mb-6 overflow-hidden rounded-xl">
	{#each packageManagers as packageManager (packageManager)}
		<Button
			onclick={() => ((pkgManager = packageManager.name), updateCommand())}
			active={pkgManager === packageManager.name}
			size="sm"
		>
			{packageManager.name}
		</Button>
	{/each}

	<div>
		<Button
			class="absolute! right-[1rem] z-2 mt-[0.5rem]"
			icon
			size="sm"
			onclick={() => (copy = true)}
			active={copy}
			variant="text"
			background="base"
			light
		>
			<Icon icon={copy ? 'mgc_task_line' : 'mgc_clipboard_line'} />
		</Button>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div bind:this={ref}>{@html commandHTML}</div>
	</div>
</div>

<style>
	.lapikit-command-line {
		border: 1px solid var(--kit-scrim);
	}

	.lapikit-command-line :global(pre) {
		padding: 12px;
	}
</style>
