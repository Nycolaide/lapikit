export const findTagEnd = (content: string, start: number): number => {
	let inSingle = false;
	let inDouble = false;
	let inTemplate = false;
	let braceDepth = 0;

	for (let i = start; i < content.length; i++) {
		const ch = content[i];
		const prev = i > 0 ? content[i - 1] : '';

		if (inSingle) {
			if (ch === "'" && prev !== '\\') inSingle = false;
			continue;
		}

		if (inDouble) {
			if (ch === '"' && prev !== '\\') inDouble = false;
			continue;
		}

		if (inTemplate) {
			if (ch === '`' && prev !== '\\') inTemplate = false;
			continue;
		}

		if (ch === "'") {
			inSingle = true;
			continue;
		}

		if (ch === '"') {
			inDouble = true;
			continue;
		}

		if (ch === '`') {
			inTemplate = true;
			continue;
		}

		if (ch === '{') {
			braceDepth++;
			continue;
		}

		if (ch === '}' && braceDepth > 0) {
			braceDepth--;
			continue;
		}

		if (braceDepth === 0 && ch === '>') {
			return i;
		}
	}

	return -1;
};
