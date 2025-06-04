<script lang="ts">
	import { Button, Popover, Icon } from 'lapikit/components';

	let ref = $state(null);
	let open = $state(false);
</script>

<Popover bind:open>
	{#snippet activator(model)}
		<Button bind:ref onclick={() => model.toggle(ref)}>
			Add comment
			<Icon icon="mgc_comment_2_fill" />
		</Button>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Button variant="text" onclick={() => (open = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Button>
			<Button onclick={() => (open = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Button>
		</div>
	</div>
</Popover>
