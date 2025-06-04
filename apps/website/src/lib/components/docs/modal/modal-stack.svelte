<script lang="ts">
	import { Modal, Button } from 'lapikit/components';

	let open: boolean = $state(false);
	let child: boolean = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open persistent>
	Modal content
	<Button onclick={() => (open = false)}>Close</Button>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum neque, nulla, eveniet officiis
		possimus maxime amet dolor iste odio inventore soluta, accusantium consectetur dolorem
		reprehenderit hic labore repudiandae et nisi.
	</p>
	<Button onclick={() => (child = true)}>Open Modal Child</Button>

	<Modal bind:open={child} contain closeWithEsc size="xs">
		Modal content child
		<Button onclick={() => (child = false)}>Close</Button>
	</Modal>
</Modal>
