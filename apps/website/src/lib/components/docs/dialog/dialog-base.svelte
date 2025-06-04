<script lang="ts">
	import { Button, Dialog } from 'lapikit/components';

	let open: boolean = $state(false);
</script>

<Button onclick={() => (open = true)}>Open dialog</Button>

<Dialog bind:open>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
