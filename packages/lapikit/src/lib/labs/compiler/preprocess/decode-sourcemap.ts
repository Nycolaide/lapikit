import { findTagEnd } from '$lib/labs/compiler/preprocess/finding.js';
import type { ComponentInfo, KitComponentScan } from '$lib/labs/compiler/types/index.js';

export const decodeSourceMap = (
	content: string,
	componentInfo: Map<string, ComponentInfo>
): KitComponentScan => {
	const importedComponents = new Map<string, string>();
	const parts: string[] = [];
	let changed = false;
	let index = 0;
	const length = content.length;

	while (index < length) {
		const nextLt = content.indexOf('<', index);
		if (nextLt === -1) {
			parts.push(content.slice(index));
			break;
		}

		if (nextLt > index) {
			parts.push(content.slice(index, nextLt));
		}

		const ch = content[nextLt + 1];
		const isClosing = ch === '/';

		if (content.startsWith('<script', nextLt) || content.startsWith('<style', nextLt)) {
			const tagName = content.startsWith('<script', nextLt) ? 'script' : 'style';
			const nameEnd = nextLt + tagName.length + 1;
			const afterName = content[nameEnd];
			if (afterName && !/[\s>/]/.test(afterName)) {
				parts.push('<');
				index = nextLt + 1;
				continue;
			}

			const openEnd = findTagEnd(content, nameEnd);
			if (openEnd === -1) {
				parts.push(content.slice(nextLt));
				break;
			}

			const closeTag = `</${tagName}>`;
			const closeStart = content.indexOf(closeTag, openEnd + 1);
			if (closeStart === -1) {
				parts.push(content.slice(nextLt));
				break;
			}

			const closeEnd = closeStart + closeTag.length;
			parts.push(content.slice(nextLt, closeEnd));
			index = closeEnd;
			continue;
		}

		const isKitTag =
			(!isClosing && content.startsWith('<kit:', nextLt)) ||
			(isClosing && content.startsWith('</kit:', nextLt));

		if (!isKitTag) {
			parts.push('<');
			index = nextLt + 1;
			continue;
		}

		const prefixLength = isClosing ? 6 : 5;
		const nameStart = nextLt + prefixLength;
		let nameEnd = nameStart;
		while (nameEnd < length) {
			const c = content[nameEnd];
			if (c === '>' || c === '/' || c === ' ' || c === '\n' || c === '\t' || c === '\r') {
				break;
			}
			nameEnd++;
		}

		const shortName = content.slice(nameStart, nameEnd);
		if (!shortName) {
			parts.push('<');
			index = nextLt + 1;
			continue;
		}

		const info = componentInfo.get(shortName);
		const isKnown = info !== undefined;
		if (isClosing) {
			const tagEnd = content.indexOf('>', nameEnd);
			if (tagEnd === -1) {
				parts.push(content.slice(nextLt));
				break;
			}

			if (isKnown) {
				importedComponents.set(info!.name, info!.ref);
				parts.push(`</${info!.name}>`);
				changed = true;
			} else {
				parts.push(content.slice(nextLt, tagEnd + 1));
			}

			index = tagEnd + 1;
			continue;
		}

		const tagEnd = findTagEnd(content, nameEnd);
		if (tagEnd === -1) {
			parts.push(content.slice(nextLt));
			break;
		}

		if (isKnown) {
			importedComponents.set(info!.name, info!.ref);
			parts.push(`<${info!.name}${content.slice(nameEnd, tagEnd + 1)}`);
			changed = true;
		} else {
			parts.push(content.slice(nextLt, tagEnd + 1));
		}

		index = tagEnd + 1;
	}

	return {
		code: changed ? parts.join('') : content,
		changed,
		importedComponents
	};
};
