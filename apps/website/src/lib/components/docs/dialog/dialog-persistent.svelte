<script lang="ts">
	import { Btn, Dialog } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Btn onclick={() => (open = true)}>Open dialog</Btn>

<Dialog bind:open persistent>
	<div>
		<Btn onclick={() => (open = false)}>Close</Btn>
	</div>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
