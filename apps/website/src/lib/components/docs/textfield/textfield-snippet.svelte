<script lang="ts">
	import { Icon, Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
</script>

<Textfield bind:value={resultInput} placeholder="Placeholder">
	{#snippet prepend()}
		<Icon icon="mgc_direction_arrow_line" />
	{/snippet}

	{#snippet prependInner()}
		<Icon icon="mgc_search_line" />
	{/snippet}

	{#snippet appendInner()}
		<Icon icon="mgc_check_line" />
	{/snippet}

	{#snippet append()}
		<Icon icon="mgc_direction_arrow_line" />
	{/snippet}
</Textfield>
