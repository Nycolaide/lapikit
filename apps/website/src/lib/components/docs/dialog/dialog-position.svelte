<script lang="ts">
	import { Button, Dialog } from 'lapikit/components';

	let openTop: boolean = $state(false);
	let openCenter: boolean = $state(false);
	let openBottom: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Button onclick={() => (openTop = true)}>Dialog top</Button>
<Button onclick={() => (openCenter = true)}>Dialog center</Button>
<Button onclick={() => (openBottom = true)}>Dialog bottom</Button>
<Button onclick={() => (openResponsive = true)}>Dialog responsive</Button>

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
