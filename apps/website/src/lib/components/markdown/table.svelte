<script lang="ts">
	import { onMount } from 'svelte';

	let props = $props();
	let ref: HTMLTableElement | null = $state(null);

	let headers: string[] = $state([]);
	let rows: string[][] = $state([]);

	let defaultIndex = $state(-1);
	let descIndex = $state(-1);

	onMount(() => {
		if (!ref) return;

		const thead = ref.querySelector('thead');
		const tbody = ref.querySelector('tbody');

		if (thead) {
			const ths = Array.from(thead.querySelectorAll('th'));
			headers = ths
				.map((th, index) => {
					const text = th.innerHTML?.trim() || '';

					if (text.toLowerCase() === 'default') {
						defaultIndex = index;
						return '';
					}
					if (['desc', 'description'].includes(text.toLowerCase())) {
						descIndex = index;
					}
					return text;
				})
				.filter((text) => text.toLowerCase() !== 'default');
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
					cells[descIndex] = `${desc} <code>${def}</code>`;
				}

				if (defaultIndex >= 0 && defaultIndex < cells.length) {
					cells.splice(defaultIndex, 1);
				}

				return cells;
			});
		}
	});

	const TOKENS = {
		$bindable: 'bindable',
		$reactive: 'reactive'
	};

	function highlightTokens(value: string): string {
		for (const [key, cls] of Object.entries(TOKENS)) {
			const re = new RegExp(`\\${key}`, 'g');
			value = value.replace(re, `<span class="token ${cls}">${key}</span>`);
		}
		return value;
	}
</script>

<span>mdsvex table</span>

{#if headers.length > 0}
	<table>
		<thead>
			<tr>
				{#each headers as head (head)}
					<th>{@html head}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					{#each row as cell}
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

<style>
	:global(code) {
		background: #f4f4f4;
		padding: 0.1rem 0.3rem;
		border-radius: 4px;
		font-size: 0.875em;
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
</style>
