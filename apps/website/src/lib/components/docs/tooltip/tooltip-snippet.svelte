<script lang="ts">
	import { Button, Tooltip } from 'lapikit/components';
</script>

<Tooltip>
	<Button>Show Tooltip</Button>

	{#snippet tooltip()}
		<img
			src="/images/gifs/theoffice-the-office-tv-moroccan-christmas.gif"
			alt="the office the office tv moroccan christmas"
		/>
	{/snippet}
</Tooltip>

<Tooltip>
	<Button>See message</Button>

	{#snippet tooltip()}
		<div style="max-width: 200px;">
			<p>Tooltip custom content</p>
			<p>
				Lapikit is the Svelte component library designed for developers who want to get straight to
				the point with elegant, high-performance components that are easy to integrate, without
				sacrificing customization or getting lost in unnecessary overlay.
			</p>
		</div>
	{/snippet}
</Tooltip>
