<script lang="ts">
	import { Btn, Dialog } from 'lapikit/components';

	let openTop: boolean = $state(false);
	let openCenter: boolean = $state(false);
	let openBottom: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Btn onclick={() => (openTop = true)}>Dialog top</Btn>
<Btn onclick={() => (openCenter = true)}>Dialog center</Btn>
<Btn onclick={() => (openBottom = true)}>Dialog bottom</Btn>
<Btn onclick={() => (openResponsive = true)}>Dialog responsive</Btn>

<Dialog bind:open={openTop} position="top">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>

<Dialog bind:open={openCenter} position="center">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>

<Dialog bind:open={openBottom} position="bottom">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>

<Dialog bind:open={openResponsive} position={{ _default: 'bottom', md: 'center' }}>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
