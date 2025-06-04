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

<Button {loading} onclick={() => handleClick()}>
	{#snippet load()}
		<Icon icon="mgc_trophy_line" />
	{/snippet}

	{#snippet append()}
		<Icon icon="mgc_check_circle_line" />
	{/snippet}

	Children

	{#snippet prepend()}
		<Icon icon="mgc_user_follow_line" />
	{/snippet}
</Button>
