<script lang="ts">
	import { Btn, Dropdown, Icon } from 'lapikit/components';

	let ref = $state(null);
</script>

<Dropdown openOnHover>
	{#snippet activator(model, handleMouseEvent)}
		<Btn
			bind:ref
			onclick={() => model.toggle(ref)}
			onmouseover={() => handleMouseEvent('open', ref)}
			onmouseleave={() => handleMouseEvent('close', ref)}
		>
			Hover Me !
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Btn>
	{/snippet}
	<div>
		<ul>
			<li>Element 1</li>
			<li>Element 2</li>
			<li>Element 3</li>
		</ul>
	</div>
</Dropdown>
