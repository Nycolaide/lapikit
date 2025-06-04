<script lang="ts">
	import { Modal, Button } from 'lapikit/components';

	let openXs: boolean = $state(false);
	let openSm: boolean = $state(false);
	let openMd: boolean = $state(false);
	let openLg: boolean = $state(false);
	let openXl: boolean = $state(false);
	let openFull: boolean = $state(false);
	let openResponsive: boolean = $state(false);
</script>

<Button onclick={() => (openXs = true)}>xs</Button>
<Button onclick={() => (openSm = true)}>sm</Button>
<Button onclick={() => (openMd = true)}>md</Button>
<Button onclick={() => (openLg = true)}>lg</Button>
<Button onclick={() => (openXl = true)}>xl</Button>
<Button onclick={() => (openFull = true)}>full</Button>
<Button onclick={() => (openResponsive = true)}>Responsive</Button>

<Modal bind:open={openXs} size="xs">Modal content</Modal>
<Modal bind:open={openSm} size="sm">Modal content</Modal>
<Modal bind:open={openMd} size="md">Modal content</Modal>
<Modal bind:open={openLg} size="lg">Modal content</Modal>
<Modal bind:open={openXl} size="xl">Modal content</Modal>
<Modal bind:open={openFull} size="full">Modal content</Modal>
<Modal bind:open={openResponsive} size={{ _default: 'full', sm: 'xs', md: 'md' }}>
	Modal content
</Modal>
