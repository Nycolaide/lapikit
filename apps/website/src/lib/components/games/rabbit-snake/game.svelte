<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import {
		createInitialSnake,
		getNextHead,
		isCollision,
		generateFood,
		GRID_SIZE,
		handleActionDisplay
	} from './helper';
	import type { Direction, Position } from './types';
	import { Btn, Icon, Tooltip } from 'lapikit/components';

	let { open = $bindable() } = $props();
	// elements
	let player: Position[] = $state([]);
	let food: Position = $state({ x: 0, y: 0 });
	// game state
	let direction: Direction = $state('right');
	let interval: number | NodeJS.Timeout | null = $state(null);
	let displayControls = $state(false);

	// state variables
	let isPlaying = $state(false);
	let isFinished = $state(false);
	let isPaused = $state(false);

	$effect.pre(() => {
		if (player.length === 0) {
			player = createInitialSnake();
			food = generateFood(player);
		}
	});

	function handleKey(e: KeyboardEvent) {
		const dirMap: Record<string, Direction> = {
			ArrowUp: 'up',
			ArrowDown: 'down',
			ArrowLeft: 'left',
			ArrowRight: 'right'
		};
		const newDir = dirMap[e.key];
		if (newDir) {
			direction = newDir;
		}
	}

	function startGame() {
		if (!isPlaying) {
			isPlaying = true;
			isPaused = false;
			interval = setInterval(gameTick, 200);
		}
	}

	function pauseGame() {
		isPlaying = false;
		isPaused = true;
		if (interval) clearInterval(interval);
	}

	function newGame() {
		isPlaying = true;
		isFinished = false;
		isPaused = false;
		player = createInitialSnake();
		food = generateFood(player);
		direction = 'right';
		interval = setInterval(gameTick, 200);
	}

	function gameTick() {
		const nextHead = getNextHead(player, direction);
		if (isCollision(nextHead, player)) {
			clearInterval(interval as number);
			isPaused = false;
			isFinished = true;
			pauseGame();
			return;
		}

		player = [nextHead, ...player];
		if (nextHead.x === food.x && nextHead.y === food.y) {
			food = generateFood(player);
		} else {
			player.pop();
		}
	}

	function changeDirection(newDir: Direction) {
		const opposites: Record<Direction, Direction> = {
			up: 'down',
			down: 'up',
			left: 'right',
			right: 'left'
		};

		if (newDir !== opposites[direction]) {
			direction = newDir;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKey);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKey);
			pauseGame();
		}
	});

	const handleAction = handleActionDisplay(open, newGame, startGame);
</script>

<div id="rabbit-snake" class="max-w=[547px] mx-auto w-full sm:w-[75vh] sm:max-w-full">
	<div class="flex min-h-[3rem] items-center justify-between">
		<span>Count: {player.length - 1}</span>

		<Tooltip label={displayControls ? 'Hide controls' : 'Show controls'} location="left">
			<Btn icon onclick={() => (displayControls = !displayControls)}>
				{#if displayControls}
					<Icon size="xl" icon="mgc_game_2_fill" color="on-surface" />
				{:else}
					<Icon size="xl" icon="mgc_game_2_line" color="on-surface" />
				{/if}
			</Btn>
		</Tooltip>

		{#if isPlaying}
			<Btn onclick={() => pauseGame()}>
				Pause
				<Icon icon="mgc_pause_fill" color="on-surface" />
			</Btn>
		{/if}
	</div>

	<div class="relative">
		{#if isFinished || isPaused || !isPlaying}
			<div
				class="overlay-game absolute z-1 flex aspect-[1] h-full w-full items-center justify-center rounded-lg"
			>
				<div class="grid items-center justify-items-center gap-14 text-2xl">
					<div class="flex flex-row items-center">
						{#each handleAction as { key, icon, display, action } (key)}
							{#if display.includes(isFinished ? 'finish' : isPaused ? 'pause' : 'start')}
								<button
									class={[`btn-${key}-game`, 'btn-close-game grid items-center gap-6']}
									onclick={action}
								>
									<i
										class={[
											icon,
											'mx-auto flex h-[5rem] w-[5rem] items-center justify-center text-[3rem]'
										]}
									></i>
									<p class="text-md">{key}</p>
								</button>
							{/if}
						{/each}
					</div>

					{#if isFinished}
						<p class="text-sm">Your score is: {player.length - 1}</p>
					{/if}
				</div>
			</div>
		{/if}

		<div class="relative overflow-hidden rounded-lg">
			<div class={['grid-game']}>
				{#each Array(GRID_SIZE * GRID_SIZE) as _, i (i)}
					{@const x = i % GRID_SIZE}
					{@const y = Math.floor(i / GRID_SIZE)}

					<div
						data-attribut={_}
						class={[
							'cell',
							player[0].x === x && player[0].y === y && 'rabbit-lead',
							player.some((p, idx) => idx !== 0 && p.x === x && p.y === y) && 'rabbit',
							food.x === x && food.y === y && 'carrot'
						]}
					></div>
				{/each}
			</div>
		</div>

		{#if displayControls}
			<div
				class={['controls-game', 'hidden-laptop absolute bottom-4 z-2 flex w-full justify-between']}
			>
				<div class="grid gap-2">
					<button class="ml-14" onclick={() => changeDirection('down')} aria-label="down">
						<i class="mgc_arrow_down_fill"></i>
					</button>
					<button class="ml-4" onclick={() => changeDirection('left')} aria-label="left">
						<i class="mgc_arrow_left_fill"></i>
					</button>
				</div>
				<div class="grid gap-2">
					<button class="mr-14" onclick={() => changeDirection('up')} aria-label="up">
						<i class="mgc_arrow_up_fill"></i>
					</button>
					<button class="ml-10" onclick={() => changeDirection('right')} aria-label="right">
						<i class="mgc_arrow_right_fill"></i>
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	#rabbit-snake {
		font-family: var(--kit-font-family-game);
	}

	.overlay-game {
		background-color: color-mix(in oklab, var(--kit-shadow) 45%, transparent);
	}

	.btn-play-game,
	.btn-replay-game,
	.btn-close-game {
		color: var(--kit-on-primary);
	}

	.btn-play-game i,
	.btn-close-game i,
	.btn-replay-game i {
		background-color: var(--kit-primary);
	}

	.btn-close-game i {
		border-radius: var(--kit-radius-xl);
	}

	.btn-play-game i,
	.btn-replay-game i {
		border-radius: var(--kit-radius-full);
	}

	.grid-game {
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		gap: 1px;
		background-color: oklch(0.627 0.194 149.214);
	}
	.cell {
		width: 100%;
		aspect-ratio: 1;
		background-color: oklch(0.792 0.209 151.711);
	}

	.controls-game button {
		background-color: transparent;
		border-radius: var(--kit-radius-full);
		border: 0.5rem solid var(--kit-primary);
		color: var(--kit-primary);
		height: 5rem;
		width: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.controls-game button:hover {
		background-color: var(--kit-primary);
		color: var(--kit-on-primary);
		transition: all 0.5s ease;
	}

	.controls-game button i {
		font-size: 2rem;
	}

	.rabbit-lead {
		background-image: url('/images/games/rabbit-carrot.png');
	}
	.rabbit {
		background-image: url('/images/games/rabbit.png');
	}
	.carrot {
		background-image: url('/images/games/carrot.png');
		background-color: oklch(0.414 0.112 45.904);
		background-size: 74% !important;
	}

	.rabbit,
	.rabbit-lead,
	.carrot {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
