import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const processImportStyles = async () => {
	const _reset = fs.readFileSync(path.resolve(__dirname, './../../styles/reset.css'), 'utf-8');
	const _animation = fs.readFileSync(
		path.resolve(__dirname, './../../styles/animation.css'),
		'utf-8'
	);
	const _keyframes = fs.readFileSync(
		path.resolve(__dirname, './../../styles/keyframes.css'),
		'utf-8'
	);

	let styles = ``;

	styles += `${_reset}\n`;
	styles += `${_animation}\n`;
	styles += `${_keyframes}\n`;

	return styles;
};
