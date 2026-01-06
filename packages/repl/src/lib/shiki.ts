import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter;

export async function getHighlighterSingleton() {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['github-dark'],
			langs: ['svelte', 'typescript', 'javascript', 'html', 'css', 'json', 'bash']
		});
	}
	return highlighter;
}
