<script lang="ts">
	import { Button, Dropdown, Icon } from 'lapikit/components';
</script>

<Dropdown>
	{#snippet activator(model)}
		<Button onclick={(el: PointerEvent) => model.toggle(el)}>
			Dropdown
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
