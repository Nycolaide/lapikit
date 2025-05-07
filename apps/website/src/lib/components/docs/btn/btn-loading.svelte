<script lang="ts">
	import { Btn } from 'lapikit/components';

	let loading: boolean = $state(false);

	const handleClick = () => {
		loading = true;
		setTimeout(() => {
			loading = false;
		}, 2000);
	};
</script>

<Btn {loading} onclick={() => handleClick()}>Default</Btn>
<Btn variant="outline" {loading} onclick={() => handleClick()}>Outline</Btn>
<Btn variant="text" {loading} onclick={() => handleClick()}>Text</Btn>
