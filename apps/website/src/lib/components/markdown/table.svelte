<script lang="ts">
	import { capitalize } from 'site-kit/actions';
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';

	let props = $props();
	let ref: HTMLTableElement | null = $state(null);

	let headers: string[] = $state([]);
	let rows: string[][] = $state([]);

	// specific indices for columns
	let defaultIndex = $state(-1);
	let descIndex = $state(-1);
	let typeIndex = $state(-1);
	let typeExtendIndex = $state(-1);

	onMount(() => {
		if (!ref) return;

		let customTable = false;
		const thead = ref.querySelector('thead');
		const tbody = ref.querySelector('tbody');
		if (thead) {
			const ths = Array.from(thead.querySelectorAll('th'));

			if (ths.length > 0 && ths[0].innerHTML.trim() === 'props') customTable = true;

			headers = ths
				.map((th, index) => {
					const text = th.innerHTML?.trim() || '';

					if (customTable) {
						if (text.toLowerCase() === 'props') {
							return capitalize($t('datatable.props'));
						}
						if (text.toLowerCase() === 'type_extend') {
							typeExtendIndex = index;
							return '';
						}
						if (text.toLowerCase() === 'default') {
							defaultIndex = index;
							return '';
						}
						if (['desc', 'description'].includes(text.toLowerCase())) {
							descIndex = index;
							return capitalize($t('datatable.description'));
						}
						if (['type', 'types'].includes(text.toLowerCase())) {
							typeIndex = index;
							return capitalize($t('datatable.types'));
						}
					}

					return capitalize($t(`datatable.${text}`));
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

				if (customTable) {
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
									`${type} <i class="mgc_information_line" title="${extendType}" style="cursor: pointer"/>`;
							} else {
								cells[typeIndex] = `${type}`;
							}
						} else {
							cells[typeIndex] = `${type}`;
						}

						if (typeExtendIndex >= 0) {
							cells.splice(typeExtendIndex, 1);
						}
					}

					if (defaultIndex >= 0 && defaultIndex < cells.length) {
						cells.splice(defaultIndex, 1);
					}
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

<div class="kit-table--markdown">
	<div class="kit-table--markdown-wrapper">
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
	.kit-table--markdown {
		overflow: hidden;
		position: relative;
		margin-top: 28px;
		margin-bottom: 38px;
		display: inline-grid;
		min-width: 100%;
	}

	.kit-table--markdown-wrapper {
		width: 100%;
		overflow: hidden;
		display: inline-block;
		overflow-x: auto;
	}

	:global(.kit-table--markdown table) {
		margin: 1rem 0;
		border-spacing: 0;
		overflow-x: auto;
		min-width: 100%;
	}

	:global(.kit-table--markdown table thead tr th) {
		text-align: start;
	}

	:global(.kit-table--markdown table thead tr),
	:global(.kit-table--markdown tbody tr:not(:last-child)) {
		border-bottom: 1px solid var(--kit-state-shadow);
	}

	:global(.kit-table--markdown table tbody) {
		width: 100%;
	}

	:global(.kit-table--markdown table tbody tr td) {
		min-width: 10rem;
		vertical-align: baseline;
		padding-block: calc(var(--system-spacing) * 6);
	}

	:global(.kit-table--markdown table tbody tr td p) {
		margin-top: 0 !important;
		line-height: normal !important;
	}

	:global(.kit-table--markdown .token) {
		padding: 0.1rem 0.3rem;
		border-radius: 4px;
		font-size: 0.8em;
		font-weight: bold;
		white-space: nowrap;
	}

	:global(.kit-table--markdown .token.bindable) {
		background: #e0f7fa;
		color: #00796b;
	}

	:global(.kit-table--markdown .token.reactive) {
		background: #fce4ec;
		color: #ad1457;
	}
</style>
