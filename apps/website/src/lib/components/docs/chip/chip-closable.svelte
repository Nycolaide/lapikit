<script lang="ts">
	import { Button, Chip, Icon } from 'lapikit/components';

	let open = $state(true);
</script>

{#if !open}
	<Button onclick={() => (open = true)}>Reset chip</Button>
{/if}

<Chip closable bind:open>
	{#snippet prepend()}
		<Icon icon="mgc_house_fill" />
	{/snippet}
	Default content
</Chip>
