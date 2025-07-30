<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
</script>

<div class="grid w-[90%]">
	<Textfield bind:value={resultInput} placeholder="Filled" variant="filled" />
	<Textfield bind:value={resultInput} placeholder="Outlined" variant="outline" />
	<Textfield bind:value={resultInput} placeholder="Text" variant="text" />
</div>
