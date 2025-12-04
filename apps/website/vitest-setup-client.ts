import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock IntersectionObserver
// @ts-expect-error - Mocking for testing
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
	takeRecords: vi.fn()
}));

// Mock Web Animations API
// @ts-expect-error - Mocking for testing
if (typeof window !== 'undefined' && window.Element) {
	// @ts-expect-error - Mocking for testing
	window.Element.prototype.animate = vi.fn().mockReturnValue({
		cancel: vi.fn(),
		finish: vi.fn(),
		pause: vi.fn(),
		play: vi.fn(),
		reverse: vi.fn(),
		updatePlaybackRate: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	});
}

// Mock for @sveltejs/enhanced-img
vi.mock('$app/environment', () => ({
	browser: false,
	building: false,
	dev: true,
	version: 'test'
}));

// add more mocks here if you need them
