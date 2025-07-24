<script lang="ts">
	import { Button, Dialog } from 'lapikit/components';

	let openDefault: boolean = $state(false);
	let openCompact: boolean = $state(false);
	let openComfortable: boolean = $state(false);
</script>

<Button onclick={() => (openDefault = true)}>Default</Button>
<Button onclick={() => (openCompact = true)}>Comptact</Button>
<Button onclick={() => (openComfortable = true)}>Comfortable</Button>

<Dialog bind:open={openDefault}>
	<div>Dialog with default density</div>
</Dialog>

<Dialog bind:open={openCompact} density="compact">
	<div>Dialog with compact density</div>
</Dialog>

<Dialog bind:open={openComfortable} density="comfortable">
	<div>Dialog with comfortable density</div>
</Dialog>
