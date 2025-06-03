<script lang="ts">
	import { Button, Popover, Icon } from 'lapikit/components';

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
		<Button bind:ref={refTop} onclick={() => model.toggle(refTop)}>Top</Button>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Button variant="text" onclick={() => (openTop = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Button>
			<Button onclick={() => (openTop = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Button>
		</div>
	</div>
</Popover>

<Popover bind:open={openBottom} position="bottom">
	{#snippet activator(model)}
		<Button bind:ref={refBottom} onclick={() => model.toggle(refBottom)}>Bottom</Button>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Button variant="text" onclick={() => (openBottom = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Button>
			<Button onclick={() => (openBottom = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Button>
		</div>
	</div>
</Popover>

<Popover bind:open={openLeft} position="left">
	{#snippet activator(model)}
		<Button bind:ref={refLeft} onclick={() => model.toggle(refLeft)}>Left</Button>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Button variant="text" onclick={() => (openLeft = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Button>
			<Button onclick={() => (openLeft = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Button>
		</div>
	</div>
</Popover>

<Popover bind:open={openRight} position="right">
	{#snippet activator(model)}
		<Button bind:ref={refRight} onclick={() => model.toggle(refRight)}>Right</Button>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Button variant="text" onclick={() => (openRight = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Button>
			<Button onclick={() => (openRight = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Button>
		</div>
	</div>
</Popover>
