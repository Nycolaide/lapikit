<script lang="ts">
	import { Alert, Button } from 'lapikit/components';

	let open = $state(true);
</script>

{#if !open}
	<Button onclick={() => (open = true)}>Open alert</Button>
{/if}

<Alert closable bind:open>
	<p>
		With this alert system, you can display them optionally. The closable action lets your users
		hide the alert once they've viewed it.
	</p>
</Alert>
