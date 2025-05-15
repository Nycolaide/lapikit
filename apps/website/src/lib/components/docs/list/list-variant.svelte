<script lang="ts">
	import { List, ListItem } from 'lapikit/components';
</script>

<List variant="text">
	<ListItem href="#item-1">Item 1 text</ListItem>
	<ListItem href="#item-2">Item 2 text</ListItem>
	<ListItem href="#item-3">Item 3 text</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 text</ListItem>
	<ListItem>Item 5 text</ListItem>
</List>

<List variant="dash">
	<ListItem href="#item-1">Item 1 dash</ListItem>
	<ListItem href="#item-2">Item 2 dash</ListItem>
	<ListItem href="#item-3">Item 3 dash</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 dash</ListItem>
	<ListItem>Item 5 dash</ListItem>
</List>

<List variant="outline">
	<ListItem href="#item-1">Item 1 outline</ListItem>
	<ListItem href="#item-2">Item 2 outline</ListItem>
	<ListItem href="#item-3">Item 3 outline</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 outline</ListItem>
	<ListItem>Item 5 outline</ListItem>
</List>

<List variant="link">
	<ListItem href="#item-1">Item 1 link</ListItem>
	<ListItem href="#item-2">Item 2 link</ListItem>
	<ListItem href="#item-3">Item 3 link</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 link</ListItem>
	<ListItem>Item 5 link</ListItem>
</List>
