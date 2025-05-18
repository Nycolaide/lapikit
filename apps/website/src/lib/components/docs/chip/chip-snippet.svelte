<script lang="ts">
	import { Chip, Icon } from 'lapikit/components';
</script>

<Chip>
	{#snippet prepend()}
		<Icon icon="mgc_house_fill" />
	{/snippet}
	{#snippet append()}
		<Icon icon="mgc_house_fill" />
	{/snippet}

	Default content

	{#snippet close()}
		<Icon icon="mgc_carrot_line" />
	{/snippet}
</Chip>
