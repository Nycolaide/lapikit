<script lang="ts">
	import { Btn, Icon, Modal } from 'lapikit/components';
	import RabbitSnake from './games/rabbit-snake/game.svelte';

	let open = $state(false);
</script>

<Btn onclick={() => (open = true)}>Game</Btn>

<Modal bind:open persistent size={{ _default: 'full', md: 'md' }}>
	<div class="flex items-center justify-between">
		<p class="text-xl font-bold">Rabbit Snake</p>
		<Btn icon onclick={() => (open = false)}>
			<Icon icon="mgc_close_fill" color="on-surface" />
		</Btn>
	</div>
	<RabbitSnake bind:open />
</Modal>
