export function capitalize(sentence?: string) {
	if (sentence === undefined) return '';
	if (sentence.length === 0) return sentence;
	const separators = /([.!?…]\s*)/;
	const parts = sentence.split(separators);
	for (let i = 0; i < parts.length; i++) {
		if (i % 2 === 0) {
			parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
		}
	}
	return parts.join('');
}
