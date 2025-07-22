<script lang="ts">
	import { Button, Icon } from 'lapikit/components';

	let top: number = $state(0);
	let show: boolean = $state(false);

	$effect(() => {
		if (top > 75) show = true;
		else show = false;
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<svelte:window bind:scrollY={top} />

<Button
	size="xl"
	density="comfortable"
	rounded="full"
	icon
	class={`fixed right-[12rem] bottom-[0.75rem] z-1100 lg:right-[0.75rem] ${show ? 'visible' : 'invisible'}`}
	onclick={scrollToTop}
>
	<Icon icon="mgc_arrow_up_fill" />
</Button>
