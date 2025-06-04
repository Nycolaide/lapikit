<script lang="ts">
	import { Button, Dropdown, Icon } from 'lapikit/components';

	let ref = $state(null);
</script>

<Dropdown closeOnClick>
	{#snippet activator(model)}
		<Button bind:ref onclick={() => model.toggle(ref)}>
			Dropdown
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Button>
	{/snippet}
	<div>
		<ul>
			<li>
				<div onclick={() => alert('Element 1')}>Element 1</div>
			</li>
			<li>
				<div onclick={() => alert('Element 2')}>Element 2</div>
			</li>
			<li>
				<div onclick={() => alert('Element3')}>Element 3</div>
			</li>
		</ul>
	</div>
</Dropdown>
