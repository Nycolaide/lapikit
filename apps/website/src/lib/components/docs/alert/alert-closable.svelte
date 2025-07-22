<script lang="ts">
	import { Alert, Button } from 'lapikit/components';

	let open = $state(true);
</script>

{#if !open}
	<Button onclick={() => (open = true)}>Open alert</Button>
{/if}

<Alert closable bind:open>
	<p>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quaerat vel, blanditiis laboriosam
		tempora ad quia perferendis fugiat autem, modi voluptate accusantium minima itaque aperiam
		dolore enim numquam laborum veniam.
	</p>
</Alert>
