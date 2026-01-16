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
			'kit:repl': import('svelte/elements').HTMLButtonAttributes & {
				children?: import('svelte').Snippet;
				title?: string;
				content?: string | Record<string, string | Record<string, unknown>>;
				presentation?: boolean;
			};
		}
	}
}

export {};
