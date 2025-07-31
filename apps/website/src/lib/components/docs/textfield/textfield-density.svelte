<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
</script>

<div class="grid w-[90%]">
	<Textfield bind:value={resultInput} placeholder="Compact density" density="compact" />
	<Textfield bind:value={resultInput} placeholder="Default density" />
	<Textfield bind:value={resultInput} placeholder="Comfortable density" density="comfortable" />
</div>
