<script lang="ts">
	import { List, ListItem, Icon } from 'lapikit/components';
</script>

<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
	<List>
		<ListItem>
			{#snippet append()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
			Item 1
		</ListItem>
		<ListItem>
			{#snippet append()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
			Item 2
			{#snippet prepend()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
		</ListItem>
		<ListItem>
			Item 3
			{#snippet prepend()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
		</ListItem>
		<ListItem>Item 4</ListItem>
		<ListItem>Item 5</ListItem>
	</List>

	<List orientation="horizontal">
		<ListItem>
			{#snippet append()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
			Item 1
		</ListItem>
		<ListItem>
			{#snippet append()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
			Item 2
			{#snippet prepend()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
		</ListItem>
		<ListItem>
			Item 3
			{#snippet prepend()}
				<Icon icon="mgc_house_fill" />
			{/snippet}
		</ListItem>
		<ListItem>Item 4</ListItem>
		<ListItem>Item 5</ListItem>
	</List>
</div>
