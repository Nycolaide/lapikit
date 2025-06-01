import { visit } from 'unist-util-visit';

export default function extractHeadings() {
	return (tree, file) => {
		const headings = [];

		visit(tree, 'heading', (node) => {
			const depth = node.depth;
			const text = node.children
				.filter((child) => child.type === 'text')
				.map((child) => child.value)
				.join('');

			const id = text
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^\w-]+/g, '');

			headings.push({ id, text, level: depth });
		});

		file.data.fm = file.data.fm || {};
		file.data.fm.headings = headings;
	};
}
