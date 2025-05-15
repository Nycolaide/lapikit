<script lang="ts">
	import { List, ListItem } from 'lapikit/components';
</script>

<List orientation="vertical">
	<ListItem href="#item-1">Item 1</ListItem>
	<ListItem href="#item-2">Item 2</ListItem>
	<ListItem href="#item-3">Item 3</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4</ListItem>
	<ListItem>Item 5</ListItem>
</List>

<List orientation="horizontal">
	<ListItem href="#item-1">Item 1</ListItem>
	<ListItem href="#item-2">Item 2</ListItem>
	<ListItem href="#item-3">Item 3</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4</ListItem>
	<ListItem>Item 5</ListItem>
</List>
