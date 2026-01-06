const components: readonly string[] = ['code'] as const;

function componentName(shortName: string): string {
	return 'Kit' + shortName.charAt(0).toUpperCase() + shortName.slice(1);
}

function replPreprocess() {
	return {
		markup({ content }: { content: string; filename?: string }) {
			const hasComponent = components.some((comp) => content.includes(`<repl:${comp}`));

			if (!hasComponent) return;

			let processedContent = content;
			const importedComponents = new Set<string>();

			let hasChanges = true;
			while (hasChanges) {
				hasChanges = false;

				for (const shortName of components) {
					const componentNameStr = componentName(shortName);

					const attrPattern = `(?:[^>"']|"[^"]*"|'[^']*')*?`;

					const selfClosingRegex = new RegExp(`<repl:${shortName}(${attrPattern})\\s*/>`, 'g');

					const pairRegex = new RegExp(
						`<repl:${shortName}(${attrPattern})>([\\s\\S]*?)<\\/repl:${shortName}\\s*>`,
						'g'
					);

					let newContent = processedContent.replace(selfClosingRegex, (fullMatch, attrs) => {
						hasChanges = true;
						importedComponents.add(componentNameStr);
						return `<${componentNameStr}${attrs} />`;
					});

					newContent = newContent.replace(pairRegex, (fullMatch, attrs, children) => {
						hasChanges = true;
						importedComponents.add(componentNameStr);
						return `<${componentNameStr}${attrs}>${children}</${componentNameStr}>`;
					});

					if (newContent !== processedContent) {
						processedContent = newContent;
					}
				}
			}

			if (processedContent === content) return;

			if (importedComponents.size > 0) {
				const imports = Array.from(importedComponents).join(', ');

				const scriptRegex = /<script(?![^>]*\bmodule\b)([^>]*)>/;
				const scriptMatch = processedContent.match(scriptRegex);

				if (scriptMatch && scriptMatch.index !== undefined) {
					const insertPos = scriptMatch.index + scriptMatch[0].length;
					processedContent =
						processedContent.slice(0, insertPos) +
						`\n\timport { ${imports} } from '@lapikit/repl/components';` +
						processedContent.slice(insertPos);
				} else {
					const moduleScriptMatch = processedContent.match(/<script[^>]*\bmodule\b[^>]*>/);

					if (moduleScriptMatch && moduleScriptMatch.index !== undefined) {
						const moduleScriptEnd =
							processedContent.indexOf('</script>', moduleScriptMatch.index) + '</script>'.length;
						processedContent =
							processedContent.slice(0, moduleScriptEnd) +
							`\n\n<script>\n\timport { ${imports} } from '@lapikit/repl/components';\n</script>` +
							processedContent.slice(moduleScriptEnd);
					} else {
						processedContent =
							`<script>\n\timport { ${imports} } from '@lapikit/repl/components';\n</script>\n\n` +
							processedContent;
					}
				}
			}

			return {
				code: processedContent
			};
		}
	};
}

export { replPreprocess };
