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
	<div>Dialog positioned at the top of the viewport</div>
</Dialog>

<Dialog bind:open={openCenter} position="center">
	<div>
		Dialog positioned at the center of the viewport. This is the default position if none is
		specified.
	</div>
</Dialog>

<Dialog bind:open={openBottom} position="bottom">
	<div>Dialog positioned at the bottom of the viewport</div>
</Dialog>

<Dialog bind:open={openResponsive} position={{ _default: 'bottom', md: 'center' }}>
	<div>
		Dialog positioned at the bottom of the viewport on small screens and at the center on medium and
		larger screens
	</div>
</Dialog>
