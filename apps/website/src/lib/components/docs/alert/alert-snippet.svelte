<script lang="ts">
	import { Alert, Icon } from 'lapikit/components';
</script>

<Alert closable>
	{#snippet prepend()}
		<p>prepend</p>
	{/snippet}
	<h3>Lorem ipsum</h3>
	<p>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quaerat vel, blanditiis laboriosam
		tempora ad quia perferendis fugiat autem, modi voluptate accusantium minima itaque aperiam
		dolore enim numquam laborum veniam.
	</p>
	{#snippet append()}
		<p>append</p>
	{/snippet}

	{#snippet close()}
		<Icon icon="mgc_carrot_line" />
	{/snippet}
</Alert>
