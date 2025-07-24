<script lang="ts">
	import { Button, Dialog } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Button onclick={() => (open = true)}>Open dialog</Button>

<Dialog bind:open>
	<div>
		<p>Lapikit is the toolbox you've been missing.</p>
		<p>Clever components, designed for speed and efficiency.</p>
		<p>Lightweight, clean, elegant: it does the job without any headaches.</p>
		<p>Once adopted, it's hard to go back.</p>
	</div>
</Dialog>
