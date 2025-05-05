export const minify = (css: string) => {
	const minified = css
		.replace(/\s+/g, ' ')
		.replace(/\/\*.*?\*\//g, '')
		.replace(/;\s*}/g, '}')
		.replace(/:\s+/g, ':')
		.replace(/\s*([{};:])\s*/g, '$1')
		.trim();

	return minified;
};
