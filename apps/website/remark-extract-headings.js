import { visit } from 'unist-util-visit';

export default function extractHeadings() {
	return (tree, file) => {
		const headings = [];

		visit(tree, 'heading', (node) => {
			const depth = node.depth;

			const extractText = (node) => {
				if (node.type === 'text') {
					return node.value;
				}
				if (node.children) {
					return node.children.map(extractText).join('');
				}
				return '';
			};

			const text = node.children.map(extractText).join('');

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
