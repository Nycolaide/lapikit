import MagicString from 'magic-string';

const AVAILABLE_COMPONENTS = ['btn'] as const;

function toComponentName(shortName: string): string {
	return 'Kit' + shortName.charAt(0).toUpperCase() + shortName.slice(1);
}

export function lapikitPreprocessor() {
	return {
		markup({ content }: { content: string; filename?: string }) {
			const hasKitComponent = AVAILABLE_COMPONENTS.some((comp) => content.includes(`<kit:${comp}`));

			if (!hasKitComponent) return;

			const s = new MagicString(content);
			const importedComponents = new Set<string>();

			for (const shortName of AVAILABLE_COMPONENTS) {
				const componentName = toComponentName(shortName);

				const regex = new RegExp(
					`<kit:${shortName}([\\s\\S]*?)>([\\s\\S]*?)<\\/kit:${shortName}\\s*>`,
					'g'
				);

				let match;
				while ((match = regex.exec(content)) !== null) {
					const [fullMatch, attrs, children] = match;
					const replacement = `<${componentName}${attrs}>${children}</${componentName}>`;
					s.overwrite(match.index, match.index + fullMatch.length, replacement);
					importedComponents.add(componentName);
				}
			}

			if (importedComponents.size > 0) {
				const imports = Array.from(importedComponents).join(', ');
				const scriptMatch = content.match(/<script([^>]*)>/);

				if (scriptMatch && scriptMatch.index !== undefined) {
					const insertPos = scriptMatch.index + scriptMatch[0].length;
					s.appendLeft(insertPos, `\n\timport { ${imports} } from 'lapikit/labs/components';`);
				} else {
					s.prepend(
						`<script>\n\timport { ${imports} } from 'lapikit/labs/components';\n</script>\n\n`
					);
				}
			}

			return {
				code: s.toString(),
				map: s.generateMap({ hires: true })
			};
		}
	};
}
