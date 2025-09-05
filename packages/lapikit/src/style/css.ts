import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { minify } from '$lib/internal/core/minify.js';

import type { Lapikit } from '$lib/internal/types.js';
import { colors, component, devices, variables } from '$lib/style/parser/index.js';
import { terminal } from '$lib/internal/terminal.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const processCSS = async (config: Lapikit) => {
	const _normalize = fs.readFileSync(path.resolve(__dirname, './normalize.css'), 'utf-8');
	const _animation = fs.readFileSync(path.resolve(__dirname, './animation.css'), 'utf-8');
	const _variables = fs.readFileSync(path.resolve(__dirname, './variable.css'), 'utf-8');

	let styles = ``;
	if (config.options.normalize) styles += `${_normalize}\n`;
	const colorScheme = colors(config);
	const deviceDisplay = devices(config);
	const variablesStyles = variables(config);

	styles += `${colorScheme.root}\n`;
	styles += `${variablesStyles}\n`;
	styles += `${variablesStyles}\n`;
	styles += `${_variables}\n`;
	styles += `${colorScheme.className}\n`;
	styles += `${deviceDisplay}\n`;
	styles += component(config);
	styles += `${_animation}\n`;

	if (config.options.minify) {
		styles = minify(styles);
		terminal('success', 'css minified');
	}

	fsPromises.writeFile(path.resolve(__dirname, '../styles.css'), styles);
};
