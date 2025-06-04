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
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit distinctio, dignissimos
				sapiente error temporibus dolorum ipsam nobis harum nulla facere tempore perferendis ullam
				ut quibusdam quisquam corrupti aut exercitationem quasi!
			</p>
		</div>
	{/snippet}
</Tooltip>
