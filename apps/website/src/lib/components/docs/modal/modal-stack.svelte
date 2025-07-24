<script lang="ts">
	import { Modal, Button } from 'lapikit/components';

	let open: boolean = $state(false);
	let child: boolean = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open persistent>
	<Button onclick={() => (open = false)}>Close</Button>

	<p>
		Modal with persistent behavior. This modal will not close when clicking outside of it or
		pressing the escape key.
	</p>

	<Button onclick={() => (child = true)}>Open Modal Child</Button>

	<Modal bind:open={child} contain closeWithEsc size="xs">
		Modal content child
		<Button onclick={() => (child = false)}>Close</Button>
	</Modal>
</Modal>
