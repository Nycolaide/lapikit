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
			<li>ça marche ??</li>
			<li>oui</li>
			<li>c'est bien</li>
			<li>c'est super</li>
			<li>c'est génial</li>
			<li>c'est incroyable</li>
			<li>c'est fantastique</li>
			<li>c'est merveilleux</li>
			<li>c'est extraordinaire</li>
			<li>c'est exceptionnel</li>
			<li>c'est sensationnel</li>
			<li>c'est fabuleux</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
			<li>c'est incroyable</li>
		</ul>
	</div>
	<div>
		<ul>
			<li>
				<div onclick={() => alert('Element 1')}>Item 1</div>
			</li>
			<li>
				<div onclick={() => alert('Element 2')}>Item 2</div>
			</li>
			<li>
				<div onclick={() => alert('Element3')}>Item 3</div>
			</li>
		</ul>
	</div>
</Dropdown>
