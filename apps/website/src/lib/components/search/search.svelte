<script lang="ts">
	import { t } from '$lib/i18n';

	import { Button, Card, Chip, Icon, Modal, Spacer, Toolbar } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';

	// modules
	import Action from './action.svelte';
	import Input from './input.svelte';
	import List from './list.svelte';
	import History from './history.svelte';

	let {
		open = $bindable(false),
		app,
		icon,
		onlyLaptop
	}: { open?: boolean; app?: boolean; icon?: boolean; onlyLaptop?: boolean } = $props();

	// states
	let searchQuery: string | undefined = $state(undefined);
	let touchList: { icon: string; name: string }[] = $state([
		{ icon: 'mgc_arrow_up_line', name: 'arrow_up' },
		{ icon: 'mgc_arrow_down_line', name: 'arrow_down' },
		{ icon: 'mgc_corner_down_left_line', name: 'enter' },
		{ icon: 'mgc_close_square_line', name: 'escape' }
	]);
</script>

<Action {app} {icon} {onlyLaptop} bind:open />

<Modal bind:open closeWithEsc position={{ _default: 'top', sm: 'center' }}>
	<Card color="on-container" background="container" rounded="xl">
		<Toolbar density="compact" class="mb-2">
			<Spacer />
			<Button size="sm" onclick={() => (open = false)} aria-label={capitalize($t('common.close'))}>
				{capitalize($t('common.close'))}

				{#snippet append()}
					<Icon icon="mgc_close_circle_line" />
				{/snippet}
			</Button>
		</Toolbar>
		<div class="mx-auto w-[95%]">
			<Input bind:value={searchQuery} {open} />

			{#if searchQuery === '' || !searchQuery}
				<History />
			{:else}
				<List {searchQuery} />
			{/if}
		</div>
		<Toolbar
			class="hidden-mobile shadow-lg"
			classContent="gap-3 text-sm "
			background="surface-container"
			density="compact"
			rounded="xl"
		>
			{#each touchList as item (item.name)}
				<Chip size="xs" density="compact">
					<Icon icon={item.icon} />

					{capitalize($t(`navigation.search_bar.keyboard.${item.name}`))}
				</Chip>
			{/each}
		</Toolbar>
	</Card>
</Modal>
