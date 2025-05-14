<script lang="ts">
	import { Modal, Btn } from 'lapikit/components';

	let open: boolean = $state(false);
	let child: boolean = $state(false);
</script>

<Btn onclick={() => (open = true)}>Open Modal</Btn>

<Modal bind:open persistent>
	Modal content
	<Btn onclick={() => (open = false)}>Close</Btn>

	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum neque, nulla, eveniet officiis
		possimus maxime amet dolor iste odio inventore soluta, accusantium consectetur dolorem
		reprehenderit hic labore repudiandae et nisi.
	</p>
	<Btn onclick={() => (child = true)}>Open Modal Child</Btn>

	<Modal bind:open={child} contain closeWithEsc size="xs">
		Modal content child
		<Btn onclick={() => (child = false)}>Close</Btn>
	</Modal>
</Modal>
