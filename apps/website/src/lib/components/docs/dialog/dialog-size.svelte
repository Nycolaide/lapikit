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
	<div>Dialog with extra small size</div>
</Dialog>
<Dialog bind:open={openSm} size="sm">
	<div>Dialog with small size</div>
</Dialog>
<Dialog bind:open={openMd} size="md">
	<div>Dialog with medium size</div>
</Dialog>
<Dialog bind:open={openLg} size="lg">
	<div>Dialog with large size</div>
</Dialog>
<Dialog bind:open={openXl} size="xl">
	<div>Dialog with extra large size</div>
</Dialog>
<Dialog bind:open={openResponsive} size={{ _default: 'xs', md: 'sm', lg: 'lg' }}>
	<div>
		<Button onclick={() => (openResponsive = false)}>Close</Button>
	</div>
	<div>
		Dialog with responsive size. It will be extra small on small screens, small on medium screens,
		and large on large screens
	</div>
</Dialog>
