<script lang="ts">
	import { Button, Icon } from 'lapikit/components';

	let loading: boolean = $state(false);

	const handleClick = () => {
		loading = true;
		setTimeout(() => {
			loading = false;
		}, 2000);
	};
</script>

<Button {loading} onclick={() => handleClick()}>Default</Button>
<Button variant="outline" {loading} onclick={() => handleClick()}>Outline</Button>
<Button variant="text" {loading} onclick={() => handleClick()}>Text</Button>
<Button {loading} onclick={() => handleClick()} icon>
	<Icon icon="mgc_house_fill" />
</Button>
