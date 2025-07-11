<script lang="ts">
	import { List, ListItem } from 'lapikit/components';
</script>

<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	<List variant="text">
		<ListItem href="#item-1">Item 1 text</ListItem>
		<ListItem href="#item-2">Item 2 text</ListItem>
		<ListItem href="#item-3">Item 3 text</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 4 text</ListItem>
		<ListItem>Item 5 text</ListItem>
	</List>

	<List variant="outline">
		<ListItem href="#item-1">Item 1 outline</ListItem>
		<ListItem href="#item-2">Item 2 outline</ListItem>
		<ListItem href="#item-3">Item 3 outline</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 4 outline</ListItem>
		<ListItem>Item 5 outline</ListItem>
	</List>

	<List variant="filled">
		<ListItem href="#item-1">Item 1 filled</ListItem>
		<ListItem href="#item-2">Item 2 filled</ListItem>
		<ListItem href="#item-3">Item 3 filled</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 4 filled</ListItem>
		<ListItem>Item 5 filled</ListItem>
	</List>
</div>
