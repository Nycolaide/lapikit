import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import { parserCSSBreakpoints } from '$lib/internal/helpers/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function componentFormatter({
	breakpoints
}: {
	breakpoints: { [key: string]: number | string };
}) {
	// load css component files (includes on components folders)
	function loadCSSFiles(directory: string) {
		fs.readdirSync(directory).forEach((File) => {
			const absolutePath = path.join(directory, File);
			if (fs.statSync(absolutePath).isDirectory()) return loadCSSFiles(absolutePath);
			else if (absolutePath.endsWith('.css') && !absolutePath.includes('/_')) {
				console.log(absolutePath);

				let css = '';
				const content = parserCSSBreakpoints(fs.readFileSync(absolutePath, 'utf8'));

				for (const property in breakpoints) {
					if (property !== 'base') {
						const name = `.${/^\d/.test(property) ? `\\3${property}` : property}\\:`;

						const value =
							typeof breakpoints[property] === 'number'
								? `${breakpoints[property]}px`
								: breakpoints[property];

						if (content.base !== '' || content.minmax !== '' || content.min !== '') {
							css += `@media screen and (min-width: ${value}) {\n`;
							if (content.base !== '') css += content.base.replaceAll('[breakpoint]', name);
							if (content.minmax !== '') css += content.minmax.replaceAll('[breakpoint]', name);
							if (content.min !== '') css += content.min.replaceAll('[breakpoint]', name);
							css += `}\n`;
						}

						if (content.max !== '' || content.all !== '') {
							css += `@media screen and (max-width: ${value}) {\n`;
							if (content.max !== '') css += content.max.replaceAll('[breakpoint]', name);
							if (content.all !== '') css += content.all.replaceAll('[breakpoint]', name);
							css += `}\n`;
						}
					} else {
						css += content.all.replaceAll('[breakpoint]', '.');
					}
				}

				let formattedCSS = css;
				formattedCSS = formattedCSS.trim().replace(/\n{3,}/g, '\n\n');

				console.log(formattedCSS);

				fs.writeFileSync(absolutePath, formattedCSS, 'utf8');
			}
		});
	}

	loadCSSFiles(path.resolve(__dirname, '../../../components'));
}
