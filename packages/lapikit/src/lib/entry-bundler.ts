function lili() {
	console.log('Lapikit preprocess running...');

	return {
		markup({ content }: { content: string; filename?: string }) {
			const processedContent = content;
			return {
				code: processedContent
			};
		}
	};
}

export { lili };
