<script lang="ts">
	import { Btn, Dropdown, Icon } from 'lapikit/components';

	let ref = $state(null);
</script>

<Dropdown closeOnClick>
	{#snippet activator(model)}
		<Btn bind:ref onclick={() => model.toggle(ref)}>
			Dropdown
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Btn>
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
