const components: readonly string[] = ['btn'] as const;

function componentName(shortName: string): string {
	return 'Kit' + shortName.charAt(0).toUpperCase() + shortName.slice(1);
}

// plugins lapikit
const lapikitPlugins = {
	repl: {
		components: ['code'],
		ref: '@lapikit/repl'
	}
} as const;

type LapikitPreprocessOptions = {
	plugins?: string[];
};

function lapikitPreprocess(options?: LapikitPreprocessOptions) {
	return {
		markup({ content }: { content: string; filename?: string }) {
			const allComponents = [...components];
			const componentToRef = new Map<string, string>();

			components.forEach((comp) => {
				componentToRef.set(comp, 'lapikit/labs/components');
			});

			// plugins
			if (options?.plugins) {
				options.plugins.forEach((pluginKey) => {
					const plugin = lapikitPlugins[pluginKey as keyof typeof lapikitPlugins];
					if (plugin) {
						plugin.components.forEach((comp) => {
							if (!allComponents.includes(comp)) {
								allComponents.push(comp);
							}
							componentToRef.set(comp, plugin.ref);
						});
					}
				});
			}

			const hasComponent = allComponents.some((comp) => content.includes(`<lpk:${comp}`));

			if (!hasComponent) return;

			let processedContent = content;
			const importedComponents = new Map<string, string>();

			let hasChanges = true;
			while (hasChanges) {
				hasChanges = false;

				for (const shortName of allComponents) {
					const componentNameStr = componentName(shortName);

					const attrPattern = `(?:[^>"']|"[^"]*"|'[^']*')*?`;

					const selfClosingRegex = new RegExp(`<lpk:${shortName}(${attrPattern})\\s*/>`, 'g');

					const pairRegex = new RegExp(
						`<lpk:${shortName}(${attrPattern})>([\\s\\S]*?)<\\/lpk:${shortName}\\s*>`,
						'g'
					);

					let newContent = processedContent.replace(selfClosingRegex, (fullMatch, attrs) => {
						hasChanges = true;
						const ref = componentToRef.get(shortName) || 'lapikit/labs/components';
						importedComponents.set(componentNameStr, ref);
						return `<${componentNameStr}${attrs} />`;
					});

					newContent = newContent.replace(pairRegex, (fullMatch, attrs, children) => {
						hasChanges = true;
						const ref = componentToRef.get(shortName) || 'lapikit/labs/components';
						importedComponents.set(componentNameStr, ref);
						return `<${componentNameStr}${attrs}>${children}</${componentNameStr}>`;
					});

					if (newContent !== processedContent) {
						processedContent = newContent;
					}
				}
			}

			if (processedContent === content) return;

			if (importedComponents.size > 0) {
				const importsByRef = new Map<string, string[]>();
				importedComponents.forEach((ref, component) => {
					if (!importsByRef.has(ref)) {
						importsByRef.set(ref, []);
					}
					importsByRef.get(ref)!.push(component);
				});

				const importLines = Array.from(importsByRef.entries())
					.map(([ref, components]) => {
						const imports = components.join(', ');
						return `\n\timport { ${imports} } from '${ref}';`;
					})
					.join('');

				const scriptRegex = /<script(?![^>]*\bmodule\b)([^>]*)>/;
				const scriptMatch = processedContent.match(scriptRegex);

				if (scriptMatch && scriptMatch.index !== undefined) {
					const insertPos = scriptMatch.index + scriptMatch[0].length;
					processedContent =
						processedContent.slice(0, insertPos) + importLines + processedContent.slice(insertPos);
				} else {
					const moduleScriptMatch = processedContent.match(/<script[^>]*\bmodule\b[^>]*>/);

					if (moduleScriptMatch && moduleScriptMatch.index !== undefined) {
						const moduleScriptEnd =
							processedContent.indexOf('</script>', moduleScriptMatch.index) + '</script>'.length;
						processedContent =
							processedContent.slice(0, moduleScriptEnd) +
							`\n\n<script>${importLines}\n</script>` +
							processedContent.slice(moduleScriptEnd);
					} else {
						processedContent = `<script>${importLines}\n</script>\n\n` + processedContent;
					}
				}
			}

			return {
				code: processedContent
			};
		}
	};
}

export { lapikitPreprocess };
