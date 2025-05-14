<script lang="ts">
	import { Modal, Btn } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Btn onclick={() => (open = true)}>Open Modal</Btn>

<Modal bind:open>Modal content</Modal>
