function presets() {
	let content = '';

	content += `/**\n`;
	content += `\tLapikit\n`;
	content += `\tLibrary documentation: https://lapikit.dev\n`;
	content += ` */\n\n`;

	content += `// Styles\n`;
	content += `import 'lapikit/css';\n\n`;

	content += `// Composables\n`;
	content += `import { helloWorld } from 'lapikit';\n\n`;

	content += `// https://lapikit.dev/docs/getting-started\n`;
	content += `export default helloWorld();`;

	return content;
}

export default presets;
