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
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>

<Dialog bind:open={openCompact} density="compact">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>

<Dialog bind:open={openComfortable} density="comfortable">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
