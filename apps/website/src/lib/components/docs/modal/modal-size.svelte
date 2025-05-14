<script lang="ts">
	import { Modal, Btn } from 'lapikit/components';

	let openXs: boolean = $state(false);
	let openSm: boolean = $state(false);
	let openMd: boolean = $state(false);
	let openLg: boolean = $state(false);
	let openXl: boolean = $state(false);
	let openFull: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Btn onclick={() => (openXs = true)}>xs</Btn>
<Btn onclick={() => (openSm = true)}>sm</Btn>
<Btn onclick={() => (openMd = true)}>md</Btn>
<Btn onclick={() => (openLg = true)}>lg</Btn>
<Btn onclick={() => (openXl = true)}>xl</Btn>
<Btn onclick={() => (openFull = true)}>full</Btn>
<Btn onclick={() => (openResponsive = true)}>Responsive</Btn>

<Modal bind:open={openXs} size="xs">Modal content</Modal>
<Modal bind:open={openSm} size="sm">Modal content</Modal>
<Modal bind:open={openMd} size="md">Modal content</Modal>
<Modal bind:open={openLg} size="lg">Modal content</Modal>
<Modal bind:open={openXl} size="xl">Modal content</Modal>
<Modal bind:open={openFull} size="full">Modal content</Modal>
<Modal bind:open={openResponsive} size={{ _default: 'full', sm: 'xs', md: 'md' }}>
	Modal content
</Modal>
