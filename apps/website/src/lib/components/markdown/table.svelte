<script lang="ts">
	import { onMount } from 'svelte';

	type Row = string[];

	let props = $props();
	let ref: HTMLTableElement | null = $state(null);

	let headers: string[] = $state([]);
	let rows: Row[] = $state([]);
	let customIndex = $state({
		_default: -1
	});
	let customRows: { _default: (string | null)[] } = $state({
		_default: []
	});

	onMount(() => {
		if (!ref) return;
		// table
		const thead = ref.querySelector('thead');
		const tbody = ref.querySelector('tbody');

		if (thead) {
			const ths = Array.from(thead.querySelectorAll('th'));

			headers = ths
				.map((th, index) => {
					const text = th.innerHTML?.trim() || '';
					if (text.toLowerCase() === 'default') {
						customIndex._default = index;
					}
					return text;
				})
				.filter((text) => text.toLowerCase() !== 'default');
		}

		if (tbody) {
			const trs = Array.from(tbody.querySelectorAll('tr'));
			rows = trs.map((tr) => {
				const tds = Array.from(tr.querySelectorAll('td'));

				const row = tds.map((td) => td.innerHTML?.trim() || '');

				if (customIndex._default >= 0 && customIndex._default < row.length) {
					customRows['_default'].push(row[customIndex._default]);
					row.splice(customIndex._default, 1);
				} else {
					customRows['_default'].push(null);
				}

				return row;
			});
		}
	});
</script>

<span>mdsvex table</span>
{#if headers.length > 0}
	<table>
		<thead>
			<tr>
				{#each headers as head (head)}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html head}
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each rows as row, i (row)}
				<tr>
					{#each row as cell, y (cell)}
						<td>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html cell}

							{#if customIndex._default === y}
								<div>{customRows['_default'][i]}</div>
							{/if}
						</td>
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
