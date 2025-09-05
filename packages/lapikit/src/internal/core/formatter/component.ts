import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import { parserCSSBreakpoints } from '$lib/internal/helpers/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function componentFormatter({
	breakpoints
}: {
	breakpoints: { [key: string]: number | string };
}) {
	// load svelte component files (includes on components folders)
	function loadSvelteFiles(directory: string) {
		fs.readdirSync(directory).forEach((File) => {
			const absolutePath = path.join(directory, File);
			if (fs.statSync(absolutePath).isDirectory()) return loadSvelteFiles(absolutePath);
			else if (absolutePath.endsWith('.css') && !absolutePath.includes('/_')) {
				const fileCSS = fs.readFileSync(absolutePath, 'utf8');
				const content = parserCSSBreakpoints(fileCSS);

				console.log('content', content);

				// all: [], allExtracted _default
				// base: [],defaultExtracted static
				// min: [],minExtracted min
				// max: [],maxExtracted max
				// minmax: [] allModifierExtracted all

				let css = `${content.cleaned}\n`;

				for (const property in breakpoints) {
					if (property !== 'base') {
						const name = `.${/^\d/.test(property) ? `\\3${property}` : property}\\:`;

						const value =
							typeof breakpoints[property] === 'number'
								? `${breakpoints[property]}px`
								: breakpoints[property];

						if (content.base !== '' || content.minmax !== '' || content.min !== '') {
							css += `\n@media screen and (min-width: ${value}) {\n`;
							if (content.base !== '') css += content.base.replaceAll('[breakpoint]', name);
							if (content.minmax !== '') css += content.minmax.replaceAll('[breakpoint]', name);
							if (content.min !== '') css += content.min.replaceAll('[breakpoint]', name);
							css += `\n}\n`;
						}

						if (content.max !== '' || content.minmax !== '') {
							css += `\n@media screen and (max-width: ${value}) {\n`;
							if (content.max !== '')
								css += content.max.replaceAll('[breakpoint]', `max\\:${name}`);
							if (content.minmax !== '')
								css += content.all.replaceAll('[breakpoint]', `max\\:${name}`);
							css += `\n}\n`;
						}
					} else {
						css += `${content.base.replaceAll('[breakpoint]', '.')}\n`;
					}
				}

				const baseName = path.basename(absolutePath, '.css');
				const svelteFilePath = path.join(path.dirname(absolutePath), `${baseName}.svelte`);

				if (fs.existsSync(svelteFilePath)) {
					let svelteContent = fs.readFileSync(svelteFilePath, 'utf8');
					svelteContent = svelteContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
					svelteContent += `<style>\n${css}</style>`;

					fs.writeFileSync(svelteFilePath, svelteContent, 'utf8');
				}
			}
		});
	}

	loadSvelteFiles(path.resolve(__dirname, '../../../components'));
}
