<script lang="ts">
	import { Button, Modal } from 'lapikit/components';

	// states
	let isOpen = $state(false);
</script>

<Button onclick={() => (isOpen = true)} active={isOpen}>Open Modal</Button>

<Modal bind:open={isOpen}>
	<h2 class="text-lg font-medium">This is a Modal Lapikit</h2>
	<p class="mt-2 text-gray-600">You can put any content you like here.</p>
	<Button onclick={() => (isOpen = false)}>Close</Button>
</Modal>
