<script lang="ts">
	let { scheme = $bindable() } = $props();
	let open = $state(false);

	function handleSelect(value: string) {
		scheme = value;
		localStorage.setItem('@lapikit/theme', value);
		open = false;
	}
</script>

<button onclick={() => (open = !open)}>
	{scheme}
</button>

{#if open}
	<ul>
		<li>
			<button onclick={() => handleSelect('light')}>
				light mode
				{#if scheme === 'light'}
					<span>*</span>
				{/if}
			</button>
		</li>
		<li>
			<button onclick={() => handleSelect('dark')}>
				dark mode
				{#if scheme === 'dark'}
					<span>*</span>
				{/if}
			</button>
		</li>
		<li>
			<button onclick={() => handleSelect('auto')}>
				auto mode
				{#if scheme === 'auto'}
					<span>*</span>
				{/if}
			</button>
		</li>
	</ul>
{/if}
