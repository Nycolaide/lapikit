<script lang="ts">
	import { List, ListItem } from 'lapikit/components';
</script>

<div class="grid w-full grid-cols-1 gap-4">
	<List size="xs">
		<ListItem href="#item-1">Item 1 xs</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 2 xs</ListItem>
		<ListItem>Item 3 xs</ListItem>
	</List>

	<List size="sm">
		<ListItem href="#item-1">Item 1 sm</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 2 sm</ListItem>
		<ListItem>Item 3 sm</ListItem>
	</List>

	<List size="md">
		<ListItem href="#item-1">Item 1 md</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 2 md</ListItem>
		<ListItem>Item 3 md</ListItem>
	</List>

	<List size="lg">
		<ListItem href="#item-1">Item 1 lg</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 2 lg</ListItem>
		<ListItem>Item 3 lg</ListItem>
	</List>

	<List size="xl">
		<ListItem href="#item-1">Item 1 xl</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 2 xl</ListItem>
		<ListItem>Item 2 xl</ListItem>
	</List>

	<List size={{ base: 'xs', md: 'lg' }}>
		<ListItem href="#item-1">Item 2 responsive</ListItem>
		<ListItem onclick={() => alert('ping')}>Item 2 responsive</ListItem>
		<ListItem>Item 3 responsive</ListItem>
	</List>
</div>
