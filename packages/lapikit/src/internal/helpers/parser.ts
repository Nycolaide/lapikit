import path from 'path';
import fs from 'fs';

import { terminal } from '$lib/internal/terminal.js';

export const parserValues = (value: string | number | Array<string | number>) => {
	if (typeof value === 'number') return `${value}px`;
	if (Array.isArray(value)) return value.join(', ');
	return value;
};

export const parserCSSBreakpoints = (css: string) => {
	const regex = /([^{]+)\{([^}]+)\}/g;
	let match;

	const matchesToRemove = [];
	const extractedByType: {
		[key: string]: string[];
	} = {
		all: [],
		base: [],
		min: [],
		max: [],
		minmax: []
	};

	while ((match = regex.exec(css)) !== null) {
		const fullMatch = match[0];
		const selectors = match[1].trim();
		const body = match[2].trim();

		const selectorsArray = selectors.split(',').map((sel) => sel.trim());

		let matchedType: keyof typeof extractedByType | null = null;

		if (selectorsArray.some((sel) => sel.includes('[breakpoint|min]'))) {
			matchedType = 'min';
		} else if (selectorsArray.some((sel) => sel.includes('[breakpoint|max]'))) {
			matchedType = 'max';
		} else if (selectorsArray.some((sel) => sel.includes('[breakpoint|all]'))) {
			matchedType = 'minmax';
		} else if (selectorsArray.some((sel) => sel.includes('[breakpoint]'))) {
			matchedType = 'base';
		}

		if (matchedType) {
			const rule = `${selectors} {\n${body}\n}`;
			extractedByType.all.push(rule);
			extractedByType[matchedType!].push(rule);
			matchesToRemove.push(fullMatch);
		}
	}

	let cleaned = css;
	for (const rule of matchesToRemove) {
		cleaned = cleaned.replace(rule, '').replace(/\n{2,}/g, '\n\n');
	}

	return {
		all: extractedByType.all
			? extractedByType.all
					.join('\n\n')
					.replaceAll('[breakpoint|min]', '[breakpoint]')
					.replaceAll('[breakpoint|max]', '[breakpoint]')
					.replaceAll('[breakpoint|all]', '[breakpoint]')
					.trim()
			: '',
		base: extractedByType.base ? extractedByType.base.join('\n\n').trim() : '',
		min: extractedByType.min
			? extractedByType.min.join('\n\n').replaceAll('[breakpoint|min]', '[breakpoint]').trim()
			: '',
		max: extractedByType.max
			? extractedByType.max.join('\n\n').replaceAll('[breakpoint|max]', '[breakpoint]').trim()
			: '',
		minmax: extractedByType.minmax
			? extractedByType.minmax.join('\n\n').replaceAll('[breakpoint|all]', '[breakpoint]').trim()
			: '',
		cleaned: cleaned.trim()
	};
};

export const parserConfigLapikit = async (app: string, filePath: string) => {
	const pathConfig = path.resolve(app, filePath);

	if (!fs.existsSync(pathConfig)) process.exit(1);

	const code = fs.readFileSync(pathConfig, 'utf-8');
	const match = code.match(/createLapikit\s*\(\s*({[\s\S]*?})\s*\)/);

	let options = {};

	if (match && match[1]) {
		try {
			options = new Function('return ' + match[1])();
		} catch (e) {
			terminal('error', `Error parsing lapikit config: ${e}`);
		}
	} else {
		terminal(
			'error',
			'lapikit configuration not found please refer to the documentation https://lapikit.dev/docs/getting-started'
		);
	}

	return options;
};
