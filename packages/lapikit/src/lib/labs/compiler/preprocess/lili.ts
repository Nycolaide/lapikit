import type { ComponentInfo, LapikitPreprocessOptions } from '$lib/labs/compiler/types/index.js';
import { componentName, lapikitImportsRef } from '$lib/labs/compiler/preprocess/source-import.js';
import { decodeSourceMap } from '$lib/labs/compiler/preprocess/decode-sourcemap.js';

// imports components and plugins
import lapikitComponents from '$lib/labs/compiler/components.js';
import lapikitPlugins from '$lib/labs/compiler/plugins.js';

export function liliCore(options?: LapikitPreprocessOptions) {
	return {
		markup({ content }: { content: string; filename?: string }) {
			const allComponents = [...lapikitComponents];
			const componentToRef = new Map<string, string>();

			lapikitComponents.forEach((comp) => {
				componentToRef.set(comp, lapikitImportsRef);
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

			if (!content.includes('<kit:')) return;

			const componentInfo = new Map<string, ComponentInfo>();
			for (const shortName of allComponents) {
				componentInfo.set(shortName, {
					name: componentName(shortName),
					ref: componentToRef.get(shortName) || lapikitImportsRef
				});
			}

			const scanResult = decodeSourceMap(content, componentInfo);

			if (!scanResult.changed) return;

			let processedContent = scanResult.code;
			const importedComponents = scanResult.importedComponents;

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
