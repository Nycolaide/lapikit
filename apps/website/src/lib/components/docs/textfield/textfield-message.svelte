<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);
</script>

<Textfield
	bind:value={resultInput}
	placeholder="Your text here"
	messagePrefix="required"
	message="enter your custom email"
	prefix="$"
	suffix="@gnomy.com"
/>
