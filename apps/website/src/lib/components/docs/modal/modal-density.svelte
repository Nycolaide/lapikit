<script lang="ts">
	import { Modal, Btn } from 'lapikit/components';

	let openDefault: boolean = $state(false);
	let openComfortable: boolean = $state(false);
	let openCompact: boolean = $state(false);
</script>

<Btn onclick={() => (openDefault = true)}>Default</Btn>
<Btn onclick={() => (openComfortable = true)}>Comfortable</Btn>
<Btn onclick={() => (openCompact = true)}>Compact</Btn>

<Modal bind:open={openDefault}>Modal content</Modal>
<Modal bind:open={openComfortable} density="comfortable">Modal content</Modal>
<Modal bind:open={openCompact} density="compact">Modal content</Modal>
