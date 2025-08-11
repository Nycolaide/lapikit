<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
</script>

<div class="grid w-[90%]">
	<Textfield bind:value={resultInput} size="xs" placeholder="Textfield xs" />
	<Textfield bind:value={resultInput} size="sm" placeholder="Textfield sm" />
	<Textfield bind:value={resultInput} size="md" placeholder="Textfield md (default)" />
	<Textfield bind:value={resultInput} size="lg" placeholder="Textfield lg" />
	<Textfield bind:value={resultInput} size="xl" placeholder="Textfield xl" />
	<Textfield
		bind:value={resultInput}
		size={{ _default: 'sm', md: 'lg' }}
		placeholder="Textfield responsive sizing"
	/>
</div>
