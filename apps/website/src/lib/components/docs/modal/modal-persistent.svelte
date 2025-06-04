<script lang="ts">
	import { Modal, Button } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open persistent
	>Modal content <Button onclick={() => (open = false)}>Close</Button></Modal
>
