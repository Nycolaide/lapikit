<script lang="ts">
	import { Button, Dialog } from 'lapikit/components';

	let openXs: boolean = $state(false);
	let openSm: boolean = $state(false);
	let openMd: boolean = $state(false);
	let openLg: boolean = $state(false);
	let openXl: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Button onclick={() => (openXs = true)}>Open dialog xs</Button>
<Button onclick={() => (openSm = true)}>Open dialog sm</Button>
<Button onclick={() => (openMd = true)}>Open dialog md</Button>
<Button onclick={() => (openLg = true)}>Open dialog lg</Button>
<Button onclick={() => (openXl = true)}>Open dialog xl</Button>
<Button onclick={() => (openResponsive = true)}>Open dialog responsive</Button>

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
<Dialog bind:open={openResponsive} size={{ _default: 'xs', md: 'sm', lg: 'lg' }}>
	<div>
		<Button onclick={() => (openResponsive = false)}>Close</Button>
	</div>
	<div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi necessitatibus quae
		recusandae porro doloribus placeat quibusdam nisi natus, voluptate ut ex, consequuntur dolores.
		Temporibus architecto iusto soluta maxime voluptates!
	</div>
</Dialog>
