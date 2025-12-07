const AVAILABLE_COMPONENTS = ['btn'] as const;

function toComponentName(shortName: string): string {
	return 'Kit' + shortName.charAt(0).toUpperCase() + shortName.slice(1);
}

export function lapikitPreprocessor() {
	return {
		markup({ content }: { content: string; filename?: string }) {
			const hasKitComponent = AVAILABLE_COMPONENTS.some((comp) => content.includes(`<kit:${comp}`));

			if (!hasKitComponent) return;

			let processedContent = content;
			const importedComponents = new Set<string>();

			let hasChanges = true;
			while (hasChanges) {
				hasChanges = false;

				for (const shortName of AVAILABLE_COMPONENTS) {
					const componentName = toComponentName(shortName);

					const regex = new RegExp(
						`<kit:${shortName}([\\s\\S]*?)>([\\s\\S]*?)<\\/kit:${shortName}\\s*>`,
						'g'
					);

					const newContent = processedContent.replace(regex, (fullMatch, attrs, children) => {
						hasChanges = true;
						importedComponents.add(componentName);
						return `<${componentName}${attrs}>${children}</${componentName}>`;
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
						`\n\timport { ${imports} } from 'lapikit/labs/components';` +
						processedContent.slice(insertPos);
				} else {
					const moduleScriptMatch = processedContent.match(/<script[^>]*\bmodule\b[^>]*>/);

					if (moduleScriptMatch && moduleScriptMatch.index !== undefined) {
						const moduleScriptEnd =
							processedContent.indexOf('</script>', moduleScriptMatch.index) + '</script>'.length;
						processedContent =
							processedContent.slice(0, moduleScriptEnd) +
							`\n\n<script>\n\timport { ${imports} } from 'lapikit/labs/components';\n</script>` +
							processedContent.slice(moduleScriptEnd);
					} else {
						processedContent =
							`<script>\n\timport { ${imports} } from 'lapikit/labs/components';\n</script>\n\n` +
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
