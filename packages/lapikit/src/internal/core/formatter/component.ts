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
			else if (absolutePath.endsWith('.svelte') && !absolutePath.includes('/_')) {
				console.log(absolutePath);

				const fileContent = fs.readFileSync(absolutePath, 'utf8');

				// Vérifier si le fichier contient des balises <style>
				const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
				const styleMatch = styleRegex.exec(fileContent);

				if (styleMatch) {
					const originalStyleContent = styleMatch[1];
					const content = parserCSSBreakpoints(originalStyleContent);

					let css = '';

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

					// Remplacer le contenu des balises <style> dans le fichier
					const updatedFileContent = fileContent.replace(
						styleRegex,
						`<style>${formattedCSS}</style>`
					);

					fs.writeFileSync(absolutePath, updatedFileContent, 'utf8');
				}
			}
		});
	}

	loadSvelteFiles(path.resolve(__dirname, '../../../components'));
}
