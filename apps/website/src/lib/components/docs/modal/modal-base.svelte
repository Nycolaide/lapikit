<script lang="ts">
	import { Modal, Button } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open>Modal content</Modal>
