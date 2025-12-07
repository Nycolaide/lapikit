// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface IntrinsicElements {
			'kit:btn': import('svelte/elements').HTMLButtonAttributes & {
				children?: import('svelte').Snippet;
				class?: string;
				style?: string;
				's-class'?: Record<string, boolean | string>;
				's-style'?: Record<string, boolean | string>;
				background?: string;
			};
		}
	}
}

export {};
