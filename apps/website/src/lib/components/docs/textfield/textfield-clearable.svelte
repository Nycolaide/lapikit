<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
</script>

<div class="grid w-[90%]">
	<Textfield bind:value={resultInput} placeholder="Enter your dreams" clearable />
	<Textfield bind:value={resultInput} placeholder="Enter your dreams" clearable persistentClear />
</div>
