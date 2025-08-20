import { promises as fs } from 'fs';
import path from 'path';
import { terminal } from '../helper.js';

const importLapikitVite = `import { lapikit } from 'lapikit/vite';`;
const importLapikitCss = `@import 'lapikit/css';`;

export async function adapterViteConfig(typescript) {
	const viteConfigPath = path.resolve(process.cwd(), `vite.config.${typescript ? 'ts' : 'js'}`);
	try {
		let viteConfig = await fs.readFile(viteConfigPath, 'utf8');

		if (!viteConfig.includes(`${importLapikitVite}`))
			viteConfig = `${importLapikitVite}\n` + viteConfig;

		const pluginsRegex = /plugins:\s*\[([^\]]*)\]/;
		const match = viteConfig.match(pluginsRegex);

		if (match && !match[1].includes('lapikit()')) {
			const updatedPlugins = match[1].trim() ? `${match[1].trim()}, lapikit()` : `lapikit()`;

			viteConfig = viteConfig.replace(pluginsRegex, `plugins: [${updatedPlugins}]`);
		}

		await fs.writeFile(viteConfigPath, viteConfig, 'utf8');

		terminal('success', 'lapikit() has added on vite.config.(js|ts) successfully');
	} catch (error) {
		terminal(
			'error',
			`lapikit() encountered a problem while editing vite.config.(js|ts):\n ${error}.\n\n`
		);
	}
}

export async function adapterCSSConfig(options) {
	const cssPath = options?.pathCSS || 'src/app.css';
	const resolvedPath = path.resolve(process.cwd(), cssPath);
	try {
		await fs.access(resolvedPath);
		let appCssContent = await fs.readFile(resolvedPath, 'utf8');
		appCssContent = `${importLapikitCss}\n\n` + appCssContent;
		await fs.writeFile(resolvedPath, appCssContent, 'utf8');

		terminal('success', `lapikit/css has added on ${cssPath}.`);
	} catch (error) {
		terminal(
			'error',
			`lapikit/css encountered a problem while editing ${cssPath}:\n  ${error.message}.\n\n`
		);
	}
}
