<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
</script>

<div class="grid w-[90%]">
	<Textfield bind:value={resultInput} placeholder="Enter your dreams" counter />
	<Textfield
		bind:value={resultInput}
		placeholder="Enter your dreams"
		counter
		maxLength={100}
		persistentMessage
	/>
</div>
