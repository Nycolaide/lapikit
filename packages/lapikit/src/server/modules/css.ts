import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { ansi, sendConsole } from './ansi.js';
import { minify } from './minify.js';
import { colors } from './themes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __components = path.resolve('src/components');

// temps
const breakpoints: { [key: string]: number | string } = {
	_default: 0,
	desktop: 1024,
	tablet: '768vw',
	mobile: 480
};

export const processCSS = async (minified?: boolean, normalize?: boolean) => {
	console.log(ansi.bold.blue('Processing CSS...'));

	const _normalize = fs.readFileSync(
		path.resolve(__dirname, '../../styles/normalize.css'),
		'utf-8'
	);
	const _variables = fs.readFileSync(
		path.resolve(__dirname, '../../styles/variables.css'),
		'utf-8'
	);

	let styles = `${_variables}\n`;
	if (normalize) styles += `${_normalize}\n`;
	const colorScheme = colors();

	styles += `${colorScheme.root}\n`;
	styles += `${colorScheme.className}\n`;

	if (fs.existsSync(__components) && fs.statSync(__components).isDirectory()) {
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

					return (styles += `${content.cleaned}\n`);
				}
			});
		}
		loadComponentCSS(path.resolve(__dirname, '../../components'));

		for (const property in breakpoints) {
			if (property !== '_default') {
				const name = `.${/^\d/.test(property) ? `\\3${property}` : property}\\:`;
				const value =
					typeof breakpoints[property] === 'number'
						? `${breakpoints[property]}px`
						: breakpoints[property];

				if (tresholds.static !== '' || tresholds.all !== '' || tresholds.min !== '') {
					styles += `@media screen and (min-width: ${value}) {\n`;
					if (tresholds.static !== '') styles += tresholds.static.replaceAll('[breakpoint]', name);
					if (tresholds.all !== '') styles += tresholds.all.replaceAll('[breakpoint]', name);
					if (tresholds.min !== '') styles += tresholds.min.replaceAll('[breakpoint]', name);
					styles += `}\n`;
				}

				if (tresholds.max !== '' || tresholds.all !== '') {
					styles += `@media screen and (max-width: ${value}) {\n`;
					if (tresholds.max !== '') styles += tresholds.max.replaceAll('[breakpoint]', name);
					if (tresholds.all !== '') styles += tresholds.all.replaceAll('[breakpoint]', name);
					styles += `}\n`;
				}
			} else {
				styles += tresholds._default.replaceAll('[breakpoint]', '.');
			}
		}
	}

	if (minified) {
		styles = minify(styles);
		sendConsole('success', 'css minified');
	}

	fsPromises.writeFile(path.resolve(__dirname, '../../styles.css'), styles);
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
