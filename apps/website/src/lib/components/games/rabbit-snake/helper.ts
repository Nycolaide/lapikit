import type { Position, Direction } from './types';

export const GRID_SIZE = 20;

export function createInitialSnake(): Position[] {
	return [{ x: 5, y: 5 }];
}

export function getNextHead(snake: Position[], dir: Direction): Position {
	const head = snake[0];
	switch (dir) {
		case 'up':
			return { x: head.x, y: head.y - 1 };
		case 'down':
			return { x: head.x, y: head.y + 1 };
		case 'left':
			return { x: head.x - 1, y: head.y };
		case 'right':
			return { x: head.x + 1, y: head.y };
	}
}

export function isCollision(pos: Position, snake: Position[]): boolean {
	return (
		pos.x < 0 ||
		pos.y < 0 ||
		pos.x >= GRID_SIZE ||
		pos.y >= GRID_SIZE ||
		snake.some((segment) => segment.x === pos.x && segment.y === pos.y)
	);
}

export function generateFood(snake: Position[]): Position {
	let pos: Position;
	do {
		pos = {
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE)
		};
	} while (snake.some((seg) => seg.x === pos.x && seg.y === pos.y));
	return pos;
}

export const handleActionDisplay = (open: boolean, newGame: () => void, startGame: () => void) => {
	return [
		{
			key: 'close',
			icon: 'mgc_close_fill',
			display: ['finish'],
			action: () => {
				open = false;
			}
		},
		{
			key: 'restart',
			icon: 'mgc_refresh_1_fill',
			display: ['pause'],
			action: () => {
				newGame();
			}
		},
		{
			key: 'play',
			icon: 'mgc_play_fill',
			display: ['start', 'pause'],
			action: () => {
				startGame();
			}
		},
		{
			key: 'replay',
			icon: 'mgc_play_fill',
			display: ['finish'],
			action: () => {
				newGame();
			}
		}
	];
};
