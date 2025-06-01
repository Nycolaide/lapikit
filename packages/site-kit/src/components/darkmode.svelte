<script lang="ts">
	let {
		scheme = $bindable(),
		handle
	}: {
		scheme: 'light' | 'dark' | 'system';
		handle: (scheme: 'light' | 'dark' | 'system') => void;
	} = $props();
	let open = $state(false);

	function handleSelect(value: 'light' | 'dark' | 'system') {
		handle(value);
		open = false;
	}
</script>

<button onclick={() => (open = !open)}>
	{scheme} btn
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
			<button onclick={() => handleSelect('system')}>
				system mode
				{#if scheme === 'system'}
					<span>*</span>
				{/if}
			</button>
		</li>
	</ul>
{/if}
