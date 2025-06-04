<script lang="ts">
	import { Modal, Button } from 'lapikit/components';

	let openCenter: boolean = $state(false);
	let openTop: boolean = $state(false);
	let openBottom: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Button onclick={() => (openCenter = true)}>Center</Button>
<Button onclick={() => (openTop = true)}>Top</Button>
<Button onclick={() => (openBottom = true)}>Bottom</Button>
<Button onclick={() => (openResponsive = true)}>Responsive</Button>

<Modal bind:open={openCenter} position="center">Modal content</Modal>
<Modal bind:open={openTop} position="top">Modal content</Modal>
<Modal bind:open={openBottom} position="bottom">Modal content</Modal>
<Modal bind:open={openResponsive} position={{ _default: 'bottom', md: 'top' }}>Modal content</Modal>
