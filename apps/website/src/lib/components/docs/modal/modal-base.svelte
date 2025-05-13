<script lang="ts">
	import { Modal, Btn } from 'lapikit/components';

	let open: boolean = $state(false);
	let openChild: boolean = $state(false);
</script>

<Btn onclick={() => (open = true)}>Open Modal</Btn>

<Modal bind:open size={{ _default: 'full', md: 'sm', lg: 'full' }}>
	Default <Btn onclick={() => (open = false)}>Close Modal</Btn>
	<Btn onclick={() => (openChild = true)}>Open Modal Child</Btn>

	<Modal bind:open={openChild} size="xs" contain>
		I'm Child Modal <Btn onclick={() => (openChild = false)}>Close Modal</Btn>
	</Modal>
</Modal>
