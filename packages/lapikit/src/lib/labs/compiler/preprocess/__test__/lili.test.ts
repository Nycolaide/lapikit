import { describe, it, expect } from 'vitest';
import { liliCore } from '../lili.js';
import { componentName, lapikitImportsRef } from '../source-import.js';

describe('liliCore', () => {
	it('converts kit tags with multiline attributes and injects imports', () => {
		const preprocess = liliCore();
		const sheetName = componentName('sheet');
		const input = `<script>const ready = true;</script>\n\n<kit:sheet\n\tclass="gnome"\n\ton:click={() => a > b}\n/>`;

		const result = preprocess.markup({ content: input });

		expect(result?.code).toContain(`import { ${sheetName} } from '${lapikitImportsRef}';`);
		expect(result?.code).toContain(`<${sheetName}`);
		expect(result?.code).toContain('class="gnome"');
		expect(result?.code).toContain('on:click={() => a > b}');
		expect(result?.code).not.toContain('<kit:sheet');
	});

	it('ignores kit tags inside script and style blocks', () => {
		const preprocess = liliCore();
		const sheetName = componentName('sheet');
		const input = `<script>\n\tconst template = '<kit:sheet />';\n</script>\n\n<style>\n\t.example::before { content: "<kit:sheet />"; }\n</style>\n\n<kit:sheet>content</kit:sheet>`;

		const result = preprocess.markup({ content: input });

		expect(result?.code).toContain("const template = '<kit:sheet />';");
		expect(result?.code).toContain('content: "<kit:sheet />";');
		expect(result?.code).toContain(`<${sheetName}>content</${sheetName}>`);
		expect(result?.code).toContain(`import { ${sheetName} } from '${lapikitImportsRef}';`);
	});

	it('does nothing when kit tags exist only inside script or style', () => {
		const preprocess = liliCore();
		const input = `<script>\n\tconst template = '<kit:sheet />';\n</script>\n\n<style>\n\t.example::before { content: "<kit:sheet />"; }\n</style>`;

		const result = preprocess.markup({ content: input });

		expect(result).toBeUndefined();
	});
});
