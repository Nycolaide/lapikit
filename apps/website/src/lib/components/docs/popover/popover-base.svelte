<script lang="ts">
	import { Btn, Popover, Icon } from 'lapikit/components';

	let ref = $state(null);
	let open = $state(false);
</script>

<Popover bind:open>
	{#snippet activator(model)}
		<Btn bind:ref onclick={() => model.toggle(ref)}>
			Add comment
			<Icon icon="mgc_comment_2_fill" />
		</Btn>
	{/snippet}
	<div>
		<div>
			<p>Add new comment</p>
			<p>Please describe your impression</p>
			<hr />
			<textarea placeholder="your text"></textarea>
			<Btn variant="text" onclick={() => (open = false)}>
				Undo
				<Icon icon="mgc_close_fill" />
			</Btn>
			<Btn onclick={() => (open = false)}>
				Send
				<Icon icon="mgc_send_fill" />
			</Btn>
		</div>
	</div>
</Popover>
