function presets({ adapterCSS }) {
	let content = '';

	content += `/**\n`;
	content += `\t* Lapikit\n`;
	content += `\t* Library documentation: https://lapikit.dev\n`;
	content += ` */\n\n`;

	if (adapterCSS === 'css') {
		content += `// Styles\n`;
		content += `import 'lapikit/css';\n\n`;
	}

	content += `// Composables\n`;
	content += `import createLapikit from 'lapikit';\n\n`;

	content += `// https://lapikit.dev/docs/getting-started\n`;
	content += `export default createLapikit({\n`;
	content += `\tadapterCSS: ${adapterCSS},\n`;
	content += `\n});`;

	return content;
}

export default presets;
