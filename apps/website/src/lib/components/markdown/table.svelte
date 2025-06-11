<script lang="ts">
	import { onMount } from 'svelte';

	let props = $props();
	let ref: HTMLTableElement | null = $state(null);

	let headers: string[] = $state([]);
	let rows: string[][] = $state([]);

	let defaultIndex = $state(-1);
	let descIndex = $state(-1);

	let typeIndex = $state(-1);
	let typeExtendIndex = $state(-1);

	onMount(() => {
		if (!ref) return;

		const thead = ref.querySelector('thead');
		const tbody = ref.querySelector('tbody');

		if (thead) {
			const ths = Array.from(thead.querySelectorAll('th'));
			headers = ths
				.map((th, index) => {
					const text = th.innerHTML?.trim() || '';

					if (text.toLowerCase() === 'extend_type') {
						typeExtendIndex = index;
						return '';
					}
					if (text.toLowerCase() === 'default') {
						defaultIndex = index;
						return '';
					}
					if (['desc', 'description'].includes(text.toLowerCase())) {
						descIndex = index;
					}
					if (['type', 'types'].includes(text.toLowerCase())) {
						typeIndex = index;
					}
					return text;
				})
				.filter((text) => text !== '');
		}

		if (tbody) {
			const trs = Array.from(tbody.querySelectorAll('tr'));
			rows = trs.map((tr) => {
				const tds = Array.from(tr.querySelectorAll('td'));
				const cells = tds.map((td) => {
					let html = td.innerHTML?.trim() || '';
					return highlightTokens(html);
				});

				if (
					defaultIndex >= 0 &&
					defaultIndex < cells.length &&
					descIndex >= 0 &&
					descIndex < cells.length
				) {
					const def = cells[defaultIndex];
					const desc = cells[descIndex];
					cells[descIndex] = `<p>${desc}</p> <div class="text-sm mt-2">Default: ${def}</div>`;
				}

				if (typeIndex >= 0 && typeIndex < cells.length) {
					const type = cells[typeIndex];
					if (typeExtendIndex >= 0 && typeExtendIndex < cells.length) {
						const extendType = cells[typeExtendIndex];
						if (extendType !== '') {
							cells[typeIndex] =
								`${type} <i class="table-info mgc_information_line" title="${extendType}"/>`;
						} else {
							cells[typeIndex] = `${type}`;
						}
					} else {
						cells[typeIndex] = `${type}`;
					}
				}

				if (defaultIndex >= 0 && defaultIndex < cells.length) {
					cells.splice(defaultIndex, 1);
				}

				if (typeIndex >= 0 && typeIndex < cells.length) {
					cells.splice(typeIndex, 1);
				}

				return cells;
			});
		}
	});

	const TOKENS = {
		$bindable: 'bindable',
		$reactive: 'reactive'
	};

	function parseMarkdownLinks(str: string): string {
		return str.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, (_match, href, text) => {
			if (href.startsWith('/')) return `<a href="${href}" sveltekit:prefetch>${text}</a>`;
			return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text} URL</a>`;
		});
	}

	function highlightTokens(value: string): string {
		for (const [key, cls] of Object.entries(TOKENS)) {
			const re = new RegExp(`\\${key}`, 'g');
			value = value.replace(re, `<span class="token ${cls}">${key}</span>`);
		}

		value = parseMarkdownLinks(value);

		return value;
	}
</script>

<div class="block-1-test">
	<div class="block-2-test">
		{#if headers.length > 0}
			<table>
				<thead>
					<tr>
						{#each headers as head (head)}
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<th>{@html head}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row (row)}
						<tr>
							{#each row as cell (cell)}
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								<td>{@html cell}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<table bind:this={ref} style="display: none">
				{@render props.children?.()}
			</table>
		{/if}
	</div>
</div>

<style>
	.block-1-test {
		overflow: hidden;
		position: relative;
	}

	.block-2-test {
		display: grid;
		width: 100%;
		overflow: auto;
	}

	:global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	:global(thead),
	:global(tbody tr:not(:last-child)) {
		border-bottom: 1px solid var(--kit-scrim);
	}

	:global(thead th) {
		text-align: start;
	}

	:global(tbody) {
		width: 100%;
	}

	:global(tbody td) {
		vertical-align: baseline;
		padding-block: calc(var(--kit-spacing) * 6);
	}

	:global(tbody p) {
		margin-top: 0 !important;
		line-height: normal !important;
	}

	:global(.token) {
		padding: 0.1rem 0.3rem;
		border-radius: 4px;
		font-size: 0.8em;
		font-weight: bold;
		white-space: nowrap;
	}

	:global(.token.bindable) {
		background: #e0f7fa;
		color: #00796b;
	}

	:global(.token.reactive) {
		background: #fce4ec;
		color: #ad1457;
	}

	:global(.table-info) {
		cursor: pointer;
	}
</style>
