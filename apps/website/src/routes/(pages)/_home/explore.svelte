<script lang="ts">
	import { Button, Icon } from 'lapikit/components';
</script>

<div>
	<div
		class="mx-auto w-full max-w-(--ui-container) px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-32"
	>
		<p class="text-2xl font-bold sm:text-3xl lg:text-4xl">Start exploring Lapikit</p>
		<p class="mt-6 sm:text-lg">Design system, themes, components, all in one lib</p>
		<Button
			class="mt-8"
			href="/docs/components"
			rounded="full"
			density="comfortable"
			background="accent-primary"
			color="white"
		>
			Discover the components
			{#snippet append()}
				<Icon size="xl" icon="mgc_arrow_right_fill" />
			{/snippet}
		</Button>
	</div>
</div>
