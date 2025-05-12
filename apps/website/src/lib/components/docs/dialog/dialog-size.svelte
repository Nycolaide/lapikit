<script lang="ts">
	import { Btn, Dialog } from 'lapikit/components';

	let openXs: boolean = $state(false);
	let openSm: boolean = $state(false);
	let openMd: boolean = $state(false);
	let openLg: boolean = $state(false);
	let openXl: boolean = $state(false);
	let openFull: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Btn onclick={() => (openXs = true)}>Open dialog xs</Btn>
<Btn onclick={() => (openSm = true)}>Open dialog sm</Btn>
<Btn onclick={() => (openMd = true)}>Open dialog md</Btn>
<Btn onclick={() => (openLg = true)}>Open dialog lg</Btn>
<Btn onclick={() => (openXl = true)}>Open dialog xl</Btn>
<Btn onclick={() => (openFull = true)}>Open dialog fullscreen</Btn>
<Btn onclick={() => (openResponsive = true)}>Open dialog responsive</Btn>

<Dialog bind:open={openXs} size="xs">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
<Dialog bind:open={openSm} size="sm">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
<Dialog bind:open={openMd} size="md">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
<Dialog bind:open={openLg} size="lg">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
<Dialog bind:open={openXl} size="xl">
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
<Dialog bind:open={openFull} size="full">
	<div>
		<Btn onclick={() => (openFull = false)}>Close</Btn>
	</div>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
<Dialog bind:open={openResponsive} size={{ _default: 'full', md: 'sm', lg: 'lg' }}>
	<div>
		<Btn onclick={() => (openResponsive = false)}>Close</Btn>
	</div>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
