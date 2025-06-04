<script lang="ts">
	import { Appbar, List, ListItem, Button } from 'lapikit/components';
</script>

<Appbar classContent="grid grid-cols-3" density="comfortable">
	<p>Lapikit</p>
	<List orientation="horizontal" rounded="full" density="compact" class="mr-auto ml-auto lg:block">
		<ListItem href="/">Home</ListItem>
		<ListItem href="/docs">Docs</ListItem>
		<ListItem href="https://github.com/Nycolaide/lapikit" target="_blank">GitHub</ListItem>
	</List>
	<div class="justify-end gap-3 lg:flex">
		<Button density="comfortable">Get started</Button>
	</div>
</Appbar>

<!-- <div class="container-exemple">
	<Navbar orientation="vertical">
		<Button>Home</Button>
		<Spacer />
		<Button>Setting</Button>
		<Button>Administration</Button>
	</Navbar>
</div>

<style>
	.container-exemple {
		width: 100%;
		background-color: red;
		height: 500px;
		display: flex;
	}
</style> -->
