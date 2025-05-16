<script lang="ts">
	import { List, ListItem, Icon } from 'lapikit/components';
</script>

<List>
	<ListItem href="#">Item 1</ListItem>
	<ListItem onclick={() => alert('hello !')}>Item 2</ListItem>
	<ListItem>Item 3 <Icon icon="mgc_house_fill" /></ListItem>
	<ListItem>Item 4</ListItem>
	<ListItem active>Item 5</ListItem>
</List>
