<script lang="ts">
	import { Btn, Dialog } from 'lapikit/components';

	let openDefault: boolean = $state(false);
	let openCompact: boolean = $state(false);
	let openComfortable: boolean = $state(false);
</script>

<Btn onclick={() => (openDefault = true)}>Default</Btn>
<Btn onclick={() => (openCompact = true)}>Comptact</Btn>
<Btn onclick={() => (openComfortable = true)}>Comfortable</Btn>

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
