<script lang="ts">
	import { Btn, Dropdown, Icon } from 'lapikit/components';
</script>

<Dropdown>
	{#snippet activator(model)}
		<Btn onclick={(el: PointerEvent) => model.toggle(el)}>
			Dropdown
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
