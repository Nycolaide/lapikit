import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter;

export async function getHighlighterSingleton() {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['vitesse-dark'],
			langs: ['svelte', 'typescript', 'javascript']
		});
	}
	return highlighter;
}
