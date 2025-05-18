<script lang="ts">
	import { Chip, Icon } from 'lapikit/components';

	let loading: boolean = $state(false);

	const handleClick = () => {
		loading = true;
		setTimeout(() => {
			loading = false;
		}, 2000);
	};
</script>

<Chip {loading} onclick={() => handleClick()}><Icon icon="mgc_house_fill" /> Default</Chip>
<Chip variant="outline" {loading} onclick={() => handleClick()}>Outline</Chip>
