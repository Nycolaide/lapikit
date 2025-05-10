<script lang="ts">
	import { Btn, Popover, Icon } from 'lapikit/components';

	let refTop = $state(null);
	let refBottom = $state(null);
	let refLeft = $state(null);
	let refRight = $state(null);
	let openTop = $state(false);
	let openBottom = $state(false);
	let openLeft = $state(false);
	let openRight = $state(false);
</script>

<Popover bind:open={openTop} position="top">
	{#snippet activator(model)}
		<Btn bind:ref={refTop} onclick={() => model.toggle(refTop)}>Top</Btn>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Btn variant="text" onclick={() => (openTop = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Btn>
			<Btn onclick={() => (openTop = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Btn>
		</div>
	</div>
</Popover>

<Popover bind:open={openBottom} position="bottom">
	{#snippet activator(model)}
		<Btn bind:ref={refBottom} onclick={() => model.toggle(refBottom)}>Bottom</Btn>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Btn variant="text" onclick={() => (openBottom = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Btn>
			<Btn onclick={() => (openBottom = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Btn>
		</div>
	</div>
</Popover>

<Popover bind:open={openLeft} position="left">
	{#snippet activator(model)}
		<Btn bind:ref={refLeft} onclick={() => model.toggle(refLeft)}>Left</Btn>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Btn variant="text" onclick={() => (openLeft = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Btn>
			<Btn onclick={() => (openLeft = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Btn>
		</div>
	</div>
</Popover>

<Popover bind:open={openRight} position="right">
	{#snippet activator(model)}
		<Btn bind:ref={refRight} onclick={() => model.toggle(refRight)}>Right</Btn>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Btn variant="text" onclick={() => (openRight = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Btn>
			<Btn onclick={() => (openRight = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Btn>
		</div>
	</div>
</Popover>
