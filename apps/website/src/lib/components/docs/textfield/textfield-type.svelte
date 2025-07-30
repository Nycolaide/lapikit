<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
	let resultInputNumber: number | undefined = $state(undefined);
	let resultInputPassword: string | undefined = $state(undefined);
	let resultInputEmail: string | undefined = $state(undefined);
</script>

<div class="grid w-[90%]">
	<Textfield bind:value={resultInput} placeholder="Type text" />
	<Textfield bind:value={resultInputNumber} placeholder="Type number" type="number" />
	<Textfield bind:value={resultInputPassword} placeholder="Type password" type="password" />
	<Textfield bind:value={resultInputEmail} placeholder="Type email" type="email" />
</div>
