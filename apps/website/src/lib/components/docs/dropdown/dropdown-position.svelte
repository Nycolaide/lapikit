<script lang="ts">
	import { Button, Dropdown, Icon } from 'lapikit/components';

	let refTop = $state(null);
	let refBottom = $state(null);
	let refLeft = $state(null);
	let refRight = $state(null);
</script>

<Dropdown openOnHover position="top">
	{#snippet activator(model, handleMouseEvent)}
		<Button
			bind:ref={refTop}
			onclick={() => model.toggle(refTop)}
			onmouseover={() => handleMouseEvent('open', refTop)}
			onmouseleave={() => handleMouseEvent('close', refTop)}
		>
			Top
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Button>
	{/snippet}
	<div>
		<ul>
			<li>Element 1</li>
			<li>Element 2</li>
			<li>Element 3</li>
		</ul>
	</div>
</Dropdown>

<Dropdown openOnHover position="left">
	{#snippet activator(model, handleMouseEvent)}
		<Button
			bind:ref={refLeft}
			onclick={() => model.toggle(refLeft)}
			onmouseover={() => handleMouseEvent('open', refLeft)}
			onmouseleave={() => handleMouseEvent('close', refLeft)}
		>
			Left
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Button>
	{/snippet}
	<div>
		<ul>
			<li>Element 1</li>
			<li>Element 2</li>
			<li>Element 3</li>
		</ul>
	</div>
</Dropdown>

<Dropdown openOnHover position="right">
	{#snippet activator(model, handleMouseEvent)}
		<Button
			bind:ref={refRight}
			onclick={() => model.toggle(refRight)}
			onmouseover={() => handleMouseEvent('open', refRight)}
			onmouseleave={() => handleMouseEvent('close', refRight)}
		>
			Right
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Button>
	{/snippet}
	<div>
		<ul>
			<li>Element 1</li>
			<li>Element 2</li>
			<li>Element 3</li>
		</ul>
	</div>
</Dropdown>

<Dropdown openOnHover position="bottom">
	{#snippet activator(model, handleMouseEvent)}
		<Button
			bind:ref={refBottom}
			onclick={() => model.toggle(refBottom)}
			onmouseover={() => handleMouseEvent('open', refBottom)}
			onmouseleave={() => handleMouseEvent('close', refBottom)}
		>
			Bottom
			<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
		</Button>
	{/snippet}
	<div>
		<ul>
			<li>Element 1</li>
			<li>Element 2</li>
			<li>Element 3</li>
		</ul>
	</div>
</Dropdown>
