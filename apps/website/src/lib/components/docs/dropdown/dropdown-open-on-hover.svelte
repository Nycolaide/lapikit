<script lang="ts">
	import { Button, Dropdown, Icon } from 'lapikit/components';

	let ref = $state(null);
</script>

<Dropdown openOnHover>
	{#snippet activator(model, handleMouseEvent)}
		<Button
			bind:ref
			onclick={() => model.toggle(ref)}
			onmouseover={() => handleMouseEvent('open', ref)}
			onmouseleave={() => handleMouseEvent('close', ref)}
		>
			Hover Me !
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Button>
	{/snippet}
	<div>
		<ul>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</ul>
	</div>
</Dropdown>
