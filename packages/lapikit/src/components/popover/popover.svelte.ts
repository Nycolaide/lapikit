import type { PositionElement } from './types.js';
import { innerWidth, innerHeight } from 'svelte/reactivity/window';

type Location = 'top' | 'bottom' | 'left' | 'right';

export function getPositions() {
	// state
	const axis: PositionElement = $state({
		x: 0,
		y: 0,
		location: null
	});

	return {
		get values() {
			return axis;
		},
		update(
			activator: HTMLElement,
			element: HTMLElement,
			location?: Location,
			centered?: boolean,
			avoidCollisions?: boolean
		) {
			if (!activator || !element) return;

			const elementRect = element.getBoundingClientRect();

			if (activator instanceof HTMLElement) {
				const activatorRect = activator.getBoundingClientRect();
				const spacing = 6;
				const _activator = activatorRect.y + activatorRect.height;
				const _element = elementRect.height + spacing;

				if (location === 'top' || location === 'bottom') {
					if (avoidCollisions) {
						if (location === 'top') {
							if (activatorRect.y - _element < 0) {
								axis.y = activatorRect.bottom + spacing;
								axis.location = 'bottom';
							} else {
								axis.y = activatorRect.top - _element;
								axis.location = 'top';
							}
						} else {
							if (_activator + _element > innerHeight.current!) {
								axis.y = activatorRect.top - _element;
								axis.location = 'top';
							} else {
								axis.y = activatorRect.bottom + spacing;
								axis.location = 'bottom';
							}
						}
					} else {
						if (location === 'top') {
							axis.y = activatorRect.top - _element;
							axis.location = 'top';
						} else {
							axis.y = activatorRect.bottom + spacing;
							axis.location = 'bottom';
						}
					}

					if (
						centered &&
						activatorRect.left - (elementRect.width - activatorRect.width) / 2 > 0 &&
						activatorRect.left + elementRect.width < innerWidth.current!
					) {
						axis.x = activatorRect.left - (elementRect.width - activatorRect.width) / 2;
					} else if (activatorRect.left + elementRect.width > innerWidth.current!) {
						axis.x = activatorRect.left - (elementRect.width - activatorRect.width);
					} else {
						axis.x = activatorRect.left;
					}
				} else if (location === 'left' || location === 'right') {
					if (avoidCollisions) {
						if (location === 'left' && !(activatorRect.left - elementRect.width < 0)) {
							axis.x = activatorRect.left - (elementRect.width + spacing);
							axis.location = 'left';
						} else {
							if (
								activatorRect.left + activatorRect.width + elementRect.width + spacing >
								innerWidth.current!
							) {
								axis.x = activatorRect.left - (elementRect.width + spacing);
								axis.location = 'left';
							} else {
								axis.x = activatorRect.left + activatorRect.width + spacing;
								axis.location = 'right';
							}
						}
					} else {
						if (location === 'left') {
							axis.x = activatorRect.left - (elementRect.width + spacing);
							axis.location = 'left';
						} else {
							axis.x = activatorRect.left + activatorRect.width + spacing;
							axis.location = 'right';
						}
					}

					if (
						centered &&
						activatorRect.top - (elementRect.height - activatorRect.height) / 2 > 0 &&
						activatorRect.top + elementRect.height < innerHeight.current!
					) {
						axis.y = activatorRect.top - (elementRect.height - activatorRect.height) / 2;
					} else if (activatorRect.y + elementRect.height > innerHeight.current!) {
						axis.y = activatorRect.y - elementRect.height + activatorRect.height;
					} else {
						axis.y = activatorRect.y;
					}
				} else {
					if (
						centered &&
						activatorRect.left - (elementRect.width - activatorRect.width) / 2 > 0 &&
						activatorRect.left + elementRect.width < innerWidth.current!
					) {
						axis.x = activatorRect.left - (elementRect.width - activatorRect.width) / 2;
					} else if (activatorRect.left + elementRect.width > innerWidth.current!) {
						axis.x = activatorRect.left - (elementRect.width - activatorRect.width);
					} else {
						axis.x = activatorRect.left;
					}

					if (
						centered &&
						activatorRect.top - (elementRect.height - activatorRect.height) / 2 > 0 &&
						activatorRect.top + elementRect.height < innerHeight.current!
					) {
						axis.y = activatorRect.top - (elementRect.height - activatorRect.height) / 2;
					} else if (activatorRect.bottom + elementRect.height > innerHeight.current!) {
						axis.y = activatorRect.top - elementRect.height;
					} else {
						axis.y = activatorRect.bottom;
					}
				}
			}
		}
	};
}
