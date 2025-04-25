<script lang="ts">
	let props = $props();

	let ref: null | HTMLElement = $state(null);
	let type = $state('');
	let text: null | string = $state(null);

	$effect.pre(() => {
		if (ref?.textContent) {
			if (ref.textContent.includes('[!NOTE]')) {
				type = 'note';
				text = ref.textContent.replace('[!NOTE]', '');
			} else if (ref.textContent.includes('[!TIP]')) {
				type = 'tip';
				text = ref.textContent.replace('[!TIP]', '');
			} else if (ref.textContent.includes('[!WARNING]')) {
				type = 'warning';
				text = ref.textContent.replace('[!WARNING]', '');
			} else if (ref.textContent.includes('[!IMPORTANT]')) {
				type = 'danger';
				text = ref.textContent.replace('[!IMPORTANT]', '');
			} else if (ref.textContent.includes('[!CAUTION]')) {
				type = 'example';
				text = ref.textContent.replace('[!CAUTION]', '');
			}
		}
	});
</script>

<span>mdsvex blockquote {type}</span>
<blockquote bind:this={ref}>
	{#if text}
		{text}
	{:else}
		{@render props.children?.()}
	{/if}
</blockquote>
