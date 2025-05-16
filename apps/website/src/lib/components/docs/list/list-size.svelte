<script lang="ts">
	import { List, ListItem } from 'lapikit/components';
</script>

<List size="xs">
	<ListItem href="#item-1">Item 1 xs</ListItem>
	<ListItem href="#item-2">Item 2 xs</ListItem>
	<ListItem href="#item-3">Item 3 xs</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 xs</ListItem>
	<ListItem>Item 5 xs</ListItem>
</List>

<List size="sm">
	<ListItem href="#item-1">Item 1 sm</ListItem>
	<ListItem href="#item-2">Item 2 sm</ListItem>
	<ListItem href="#item-3">Item 3 sm</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 sm</ListItem>
	<ListItem>Item 5 sm</ListItem>
</List>

<List size="md">
	<ListItem href="#item-1">Item 1 md</ListItem>
	<ListItem href="#item-2">Item 2 md</ListItem>
	<ListItem href="#item-3">Item 3 md</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 md</ListItem>
	<ListItem>Item 5 md</ListItem>
</List>

<List size="lg">
	<ListItem href="#item-1">Item 1 lg</ListItem>
	<ListItem href="#item-2">Item 2 lg</ListItem>
	<ListItem href="#item-3">Item 3 lg</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 lg</ListItem>
	<ListItem>Item 5 lg</ListItem>
</List>

<List size="xl">
	<ListItem href="#item-1">Item 1 xl</ListItem>
	<ListItem href="#item-2">Item 2 xl</ListItem>
	<ListItem href="#item-3">Item 3 xl</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 xl</ListItem>
	<ListItem>Item 5 xl</ListItem>
</List>

<List size={{ _default: 'xs', md: 'lg' }}>
	<ListItem href="#item-1">Item 1 responsive</ListItem>
	<ListItem href="#item-2">Item 2 responsive</ListItem>
	<ListItem href="#item-3">Item 3 responsive</ListItem>
	<ListItem onclick={() => alert('ping')}>Item 4 responsive</ListItem>
	<ListItem>Item 5 responsive</ListItem>
</List>
