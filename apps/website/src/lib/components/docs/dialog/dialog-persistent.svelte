<script lang="ts">
	import { Button, Dialog } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Button onclick={() => (open = true)}>Open dialog</Button>

<Dialog bind:open persistent>
	<div>
		<Button onclick={() => (open = false)}>Close</Button>
	</div>
	<div>
		Dialog with persistent behavior. This dialog will not close when clicking outside of it or
		pressing the escape key.
	</div>
</Dialog>
