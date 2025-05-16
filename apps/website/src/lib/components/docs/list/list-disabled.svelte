<script lang="ts">
	import { List, ListItem } from 'lapikit/components';
</script>

<List>
	<ListItem href="#item-1" disabled>Item 1</ListItem>
	<ListItem href="#item-2" active disabled>Item 2</ListItem>
	<ListItem href="#item-3" disabled>Item 3</ListItem>
	<ListItem onclick={() => alert('ping')} disabled>Item 4</ListItem>
	<ListItem active disabled>Item 5</ListItem>
</List>
