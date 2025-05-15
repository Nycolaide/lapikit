<script lang="ts">
	import { List, ListItem, Icon } from 'lapikit/components';
</script>

<List size="lg" nav>
	<ListItem href="#">Item 1</ListItem>
	<ListItem onclick={() => alert('hello !')}>Item 2</ListItem>
	<ListItem>Item 3 <Icon icon="mgc_house_fill" /></ListItem>
	<ListItem>Item 4</ListItem>
	<ListItem active>Item 5</ListItem>
</List>

<p>horizontal</p>

<List orientation="horizontal">
	<ListItem onclick={() => alert('hello !')}>Item 1</ListItem>
	<ListItem>Item 2 <Icon icon="mgc_house_fill" /></ListItem>
	<ListItem>Item 3</ListItem>
	<ListItem active>Item 4</ListItem>
	<ListItem>Item 5 <Icon icon="mgc_house_fill" /></ListItem>
	<ListItem href="#">Item 6</ListItem>
</List>

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
