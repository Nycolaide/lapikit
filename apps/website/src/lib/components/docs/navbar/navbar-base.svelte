<script lang="ts">
	import { Navbar, List, ListItem, Btn, Spacer } from 'lapikit/components';
</script>

<Navbar classContent="grid grid-cols-3" density="comfortable">
	<p>Lapikit</p>
	<List orientation="horizontal" rounded="full" density="compact" class="mr-auto ml-auto lg:block">
		<ListItem href="/">Home</ListItem>
		<ListItem href="/docs">Docs</ListItem>
		<ListItem href="https://github.com/Nycolaide/lapikit" target="_blank">GitHub</ListItem>
	</List>
	<div class="justify-end gap-3 lg:flex">
		<Btn density="comfortable">Get started</Btn>
	</div>
</Navbar>

<div class="container-exemple">
	<Navbar orientation="vertical">
		<Btn>Home</Btn>
		<Spacer />
		<Btn>Setting</Btn>
		<Btn>Administration</Btn>
	</Navbar>
</div>

<style>
	.container-exemple {
		width: 100%;
		background-color: red;
		height: 500px;
		display: flex;
	}
</style>
