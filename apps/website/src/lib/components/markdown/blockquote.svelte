<script lang="ts">
	import { Alert, Icon } from 'lapikit/components';

	let props = $props();

	let ref: null | HTMLElement = $state(null);
	let type = $state('');
	let text: null | string = $state(null);

	$effect.pre(() => {
		if (ref?.textContent) {
			if (ref.textContent.includes('[!INFO]')) {
				type = 'info';
				text = ref.textContent.replace('[!INFO]', '');
			} else if (ref.textContent.includes('[!WARNING]')) {
				type = 'warning';
				text = ref.textContent.replace('[!WARNING]', '');
			} else if (ref.textContent.includes('[!IMPORTANT]')) {
				type = 'important';
				text = ref.textContent.replace('[!IMPORTANT]', '');
			}
		}
	});
</script>

<Alert
	warning={type === 'warning'}
	info={type === 'info'}
	success={type === 'success'}
	error={type === 'important'}
>
	{#snippet prepend()}
		{#if type === 'info'}
			<Icon icon="mgc_information_line" />
		{:else if type === 'warning'}
			<Icon icon="mgc_alert_line" />
		{:else if type === 'important'}
			<Icon icon="mgc_alert_octagon_line" />
		{/if}
	{/snippet}

	<div bind:this={ref}>
		{#if text}
			{text}
		{:else}
			{@render props.children?.()}
		{/if}
	</div>
</Alert>
