<script lang="ts">
	import { Modal, Button } from 'lapikit/components';

	let openDefault: boolean = $state(false);
	let openComfortable: boolean = $state(false);
	let openCompact: boolean = $state(false);
</script>

<Button onclick={() => (openDefault = true)}>Default</Button>
<Button onclick={() => (openComfortable = true)}>Comfortable</Button>
<Button onclick={() => (openCompact = true)}>Compact</Button>

<Modal bind:open={openDefault}>Modal content</Modal>
<Modal bind:open={openComfortable} density="comfortable">Modal content</Modal>
<Modal bind:open={openCompact} density="compact">Modal content</Modal>
