import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import type { Lapikit } from '$lib/internal/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const component = (config: Lapikit) => {
	let css = ``;
	const tresholds = {
		_default: '',
		static: '',
		min: '',
		max: '',
		all: ''
	};

	function loadComponentCSS(directory: string) {
		fs.readdirSync(directory).forEach((File) => {
			const absolutePath = path.join(directory, File);
			if (fs.statSync(absolutePath).isDirectory()) return loadComponentCSS(absolutePath);
			else if (absolutePath.endsWith('.css') && !absolutePath.includes('/_')) {
				const content = parser(fs.readFileSync(absolutePath, 'utf-8'));

				tresholds._default += content.allExtracted
					.replaceAll('[breakpoint|min]', '[breakpoint]')
					.replaceAll('[breakpoint|max]', '[breakpoint]')
					.replaceAll('[breakpoint|all]', '[breakpoint]');

				tresholds.static += content.defaultExtracted;
				tresholds.min += content.minExtracted.replaceAll('[breakpoint|min]', '[breakpoint]');
				tresholds.max += content.maxExtracted.replaceAll('[breakpoint|max]', '[breakpoint]');
				tresholds.all += content.allModifierExtracted.replaceAll(
					'[breakpoint|all]',
					'[breakpoint]'
				);

				return (css += `${content.cleaned}\n`);
			}
		});
	}
	loadComponentCSS(path.resolve(__dirname, '../../components'));

	for (const property in config.breakpoints.thresholds) {
		if (property !== '_default') {
			const name = `.${/^\d/.test(property) ? `\\3${property}` : property}\\:`;
			const value =
				typeof config.breakpoints.thresholds[property] === 'number'
					? `${config.breakpoints.thresholds[property]}px`
					: config.breakpoints.thresholds[property];

			if (tresholds.static !== '' || tresholds.all !== '' || tresholds.min !== '') {
				css += `@media screen and (min-width: ${value}) {\n`;
				if (tresholds.static !== '') css += tresholds.static.replaceAll('[breakpoint]', name);
				if (tresholds.all !== '') css += tresholds.all.replaceAll('[breakpoint]', name);
				if (tresholds.min !== '') css += tresholds.min.replaceAll('[breakpoint]', name);
				css += `}\n`;
			}

			if (tresholds.max !== '' || tresholds.all !== '') {
				css += `@media screen and (max-width: ${value}) {\n`;
				if (tresholds.max !== '') css += tresholds.max.replaceAll('[breakpoint]', name);
				if (tresholds.all !== '') css += tresholds.all.replaceAll('[breakpoint]', name);
				css += `}\n`;
			}
		} else {
			css += tresholds._default.replaceAll('[breakpoint]', '.');
		}
	}

	return css;
};

const parser = (css: string) => {
	const regex = /([^{]+)\{([^}]+)\}/g;
	let match;

	const matchesToRemove = [];
	const extractedByType: {
		[key: string]: string[];
	} = {
		allExtracted: [],
		defaultExtracted: [],
		minExtracted: [],
		maxExtracted: [],
		allModifierExtracted: []
	};

	while ((match = regex.exec(css)) !== null) {
		const fullMatch = match[0];
		const selectors = match[1].trim();
		const body = match[2].trim();

		const selectorsArray = selectors.split(',').map((sel) => sel.trim());

		let matchedType: keyof typeof extractedByType | null = null;

		if (selectorsArray.some((sel) => sel.includes('[breakpoint|min]'))) {
			matchedType = 'minExtracted';
		} else if (selectorsArray.some((sel) => sel.includes('[breakpoint|max]'))) {
			matchedType = 'maxExtracted';
		} else if (selectorsArray.some((sel) => sel.includes('[breakpoint|all]'))) {
			matchedType = 'allModifierExtracted';
		} else if (selectorsArray.some((sel) => sel.includes('[breakpoint]'))) {
			matchedType = 'defaultExtracted';
		}

		if (matchedType) {
			const rule = `${selectors} {\n${body}\n}`;
			extractedByType.allExtracted.push(rule);
			extractedByType[matchedType!].push(rule);
			matchesToRemove.push(fullMatch);
		}
	}

	let cleaned = css;
	for (const rule of matchesToRemove) {
		cleaned = cleaned.replace(rule, '').replace(/\n{2,}/g, '\n\n');
	}

	return {
		allExtracted: extractedByType.allExtracted.join('\n\n').trim(),
		defaultExtracted: extractedByType.defaultExtracted.join('\n\n').trim(),
		minExtracted: extractedByType.minExtracted.join('\n\n').trim(),
		maxExtracted: extractedByType.maxExtracted.join('\n\n').trim(),
		allModifierExtracted: extractedByType.allModifierExtracted.join('\n\n').trim(),
		cleaned: cleaned.trim()
	};
};
