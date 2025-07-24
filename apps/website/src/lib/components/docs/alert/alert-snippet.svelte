<script lang="ts">
	import { Alert, Icon } from 'lapikit/components';
</script>

<Alert closable>
	{#snippet prepend()}
		<p>prepend</p>
	{/snippet}
	<p>children</p>
	{#snippet append()}
		<p>append</p>
	{/snippet}

	{#snippet close()}
		<Icon icon="mgc_carrot_line" />
	{/snippet}
</Alert>
