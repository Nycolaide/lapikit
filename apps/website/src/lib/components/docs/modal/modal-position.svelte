<script lang="ts">
	import { Modal, Btn } from 'lapikit/components';

	let openCenter: boolean = $state(false);
	let openTop: boolean = $state(false);
	let openBottom: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Btn onclick={() => (openCenter = true)}>Center</Btn>
<Btn onclick={() => (openTop = true)}>Top</Btn>
<Btn onclick={() => (openBottom = true)}>Bottom</Btn>
<Btn onclick={() => (openResponsive = true)}>Responsive</Btn>

<Modal bind:open={openCenter} position="center">Modal content</Modal>
<Modal bind:open={openTop} position="top">Modal content</Modal>
<Modal bind:open={openBottom} position="bottom">Modal content</Modal>
<Modal bind:open={openResponsive} position={{ _default: 'bottom', md: 'top' }}>Modal content</Modal>
