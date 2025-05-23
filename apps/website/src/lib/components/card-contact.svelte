<script lang="ts">
	import { Avatar, Btn, Card, Dialog, List, ListItem } from 'lapikit/components';

	let open = $state(false);
	let data = $state([
		{
			name: 'Nycolaide',
			avatar: 'https://avatars.githubusercontent.com/u/62988176?v=4&size=64',
			github: 'https://github.com/Nycolaide'
		},
		{
			name: 'fersimone',
			avatar: 'https://avatars.githubusercontent.com/u/132093263?v=4&size=64',
			github: 'https://github.com/fersimone'
		}
	]);

	const handleSave = () => {
		console.log('Save');
	};
</script>

<div class="max-w-[200px]">
	<Card>
		<p>Contact</p>
		<List>
			{#each data as { name, avatar, github } (name)}
				<ListItem href={github} target="_blank">
					{#snippet append()}
						<Avatar src={avatar} alt={name} />
					{/snippet}
					{name}
				</ListItem>
			{/each}
		</List>
		<Btn onclick={() => (open = true)}>add contact</Btn>
	</Card>
</div>

<Dialog bind:open>
	<p>Add new contact</p>
	<div>
		<label for="name">Name (4 to 8 characters):</label>
		<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
	</div>
	<Btn onclick={() => (open = false)}>Undo</Btn>
	<Btn onclick={() => handleSave()}>Save</Btn>
</Dialog>
