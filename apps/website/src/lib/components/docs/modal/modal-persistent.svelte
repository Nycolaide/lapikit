<script lang="ts">
	import { Modal, Btn } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Btn onclick={() => (open = true)}>Open Modal</Btn>

<Modal bind:open persistent>Modal content <Btn onclick={() => (open = false)}>Close</Btn></Modal>
