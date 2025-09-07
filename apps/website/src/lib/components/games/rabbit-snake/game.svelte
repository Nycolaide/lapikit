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
	import { Button, Icon } from 'lapikit/components';
	import { t } from '$lib/i18n';

	// images
	import rabbitCarrot from '$lib/components/games/rabbit-snake/images/rabbit-carrot.png';
	import rabbit from '$lib/components/games/rabbit-snake/images/rabbit.png';
	import carrot from '$lib/components/games/rabbit-snake/images/carrot.png';

	let { open = $bindable() } = $props();
	// elements
	let player: Position[] = $state([]);
	let food: Position = $state({ x: 0, y: 0 });
	// game state
	let direction: Direction = $state('right');
	let interval: number | NodeJS.Timeout | null = $state(null);

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
		<span>{$t('game.score', { count: player.length - 1 })}</span>

		{#if isPlaying}
			<Button onclick={() => pauseGame()}>
				{$t('game.pause')}
				<Icon icon="mgc_pause_fill" color="on-surface" />
			</Button>
		{/if}
	</div>

	<div class="relative">
		{#if isFinished || isPaused || !isPlaying}
			<div
				class="overlay-game absolute z-1 flex aspect-[1] h-full w-full items-center justify-center rounded-lg"
			>
				<div class="grid items-center justify-items-center gap-14 text-2xl">
					<div class="grid grid-flow-col items-center gap-10">
						{#each handleAction as { key, icon, display, action } (key)}
							{#if display.includes(isFinished ? 'finish' : isPaused ? 'pause' : 'start')}
								<button
									class={[`Button-${key}-game`, 'Button-close-game grid items-center gap-6']}
									onclick={action}
								>
									<i
										class={[
											icon,
											'mx-auto flex h-[5rem] w-[5rem] items-center justify-center text-[3rem]'
										]}
									></i>
									<p class="md:text-md text-sm">{$t(`game.${key}`)}</p>
								</button>
							{/if}
						{/each}
					</div>

					{#if isFinished}
						<p class="text-sm">{$t('game.your_score', { count: player.length - 1 })}</p>
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
						style:background-image="url({player[0].x === x && player[0].y === y
							? rabbitCarrot
							: player.some((p, idx) => idx !== 0 && p.x === x && p.y === y)
								? rabbit
								: food.x === x && food.y === y
									? carrot
									: ''})"
					></div>
				{/each}
			</div>
		</div>
	</div>
</div>

<div
	class={[
		'controls-game',
		'kit-device--h-tablet absolute bottom-4 z-2 flex w-full justify-between'
	]}
>
	<div class="grid gap-2">
		<button class="ml-10" onclick={() => changeDirection('right')} aria-label="right">
			<i class="mgc_arrow_right_fill"></i>
		</button>
		<button class="ml-4" onclick={() => changeDirection('left')} aria-label="left">
			<i class="mgc_arrow_left_fill"></i>
		</button>
	</div>
	<div class="grid gap-2">
		<button class="mr-14" onclick={() => changeDirection('up')} aria-label="up">
			<i class="mgc_arrow_up_fill"></i>
		</button>
		<button class="ml-6" onclick={() => changeDirection('down')} aria-label="down">
			<i class="mgc_arrow_down_fill"></i>
		</button>
	</div>
</div>

<style>
	#rabbit-snake {
		font-family: var(--kit-font-family-game);
	}

	.overlay-game {
		background-color: color-mix(in oklab, var(--kit-shadow) 45%, transparent);
	}

	.controls-game {
		max-width: calc(100% - var(--modal-spacing-x) * 2);
	}

	.Button-play-game,
	.Button-replay-game,
	.Button-close-game {
		color: var(--kit-on-primary);
	}

	.Button-play-game i,
	.Button-close-game i,
	.Button-replay-game i {
		background-color: var(--kit-primary);
	}

	.Button-close-game i {
		border-radius: var(--kit-radius-xl);
	}

	.Button-play-game i,
	.Button-replay-game i {
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

	.carrot {
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
