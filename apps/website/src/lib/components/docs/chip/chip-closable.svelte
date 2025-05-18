<script lang="ts">
	import { Btn, Chip, Icon } from 'lapikit/components';

	let open = $state(true);
</script>

{#if !open}
	<Btn onclick={() => (open = true)}>Reset chip</Btn>
{/if}

<Chip closable bind:open>
	{#snippet prepend()}
		<Icon icon="mgc_house_fill" />
	{/snippet}
	Default content
</Chip>
