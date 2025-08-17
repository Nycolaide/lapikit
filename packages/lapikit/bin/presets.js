function presets() {
	let content = '';

	content += `/**`;
	content += `\tLapikit`;
	content += `\tLibrary documentation: https://lapikit.dev`;
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
