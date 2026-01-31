import { describe, it, expect, vi, beforeEach } from 'vitest';
import { liliCore } from '../lili.js';

// mocks
vi.mock('$lib/labs/compiler/components.js', () => ({
	default: ['sheet']
}));

vi.mock('$lib/labs/compiler/plugins.js', () => ({
	default: {}
}));

vi.mock('$lib/labs/compiler/preprocess/source-import.js', () => ({
	componentName: (name: string) => name.charAt(0).toUpperCase() + name.slice(1),
	lapikitImportsRef: 'lapikit/labs/components'
}));

describe('liliCore preprocess', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('replaces self-closing <kit:sheet /> components', () => {
		const content = `<kit:sheet />`;

		const result = liliCore().markup({ content });

		expect(result?.code).toContain('<Sheet />');
		expect(result?.code).toContain(`import { Sheet } from 'lapikit/labs/components';`);
	});

	it('replaces components with children <kit:sheet>...</kit:sheet>', () => {
		const content = `
      <kit:sheet>
        <div>hello</div>
      </kit:sheet>
    `;

		const result = liliCore().markup({ content });

		expect(result?.code).toContain(
			`<Sheet>
        <div>hello</div>
      </Sheet>`
		);
		expect(result?.code).toContain(`import { Sheet } from 'lapikit/labs/components';`);
	});

	it('injects imports into an existing <script> tag', () => {
		const content = `
      <script>
        const foo = 'bar';
      </script>

      <kit:sheet />
    `;

		const result = liliCore().markup({ content });

		expect(result?.code).toMatch(
			/<script>[\s\S]*import \{ Sheet \} from 'lapikit\/labs\/components';/
		);
	});

	it('creates a <script> tag when none exists', () => {
		const content = `
      <div>
        <kit:sheet />
      </div>
    `;

		const result = liliCore().markup({ content });

		expect(result?.code.startsWith('<script>')).toBe(true);
		expect(result?.code).toContain(`import { Sheet } from 'lapikit/labs/components';`);
	});

	it('does nothing when no kit:* component is present', () => {
		const content = `<div>no kit here</div>`;

		const result = liliCore().markup({ content });

		expect(result).toBeUndefined();
	});

	it('preserves component attributes', () => {
		const content = `<kit:sheet id="main" class="foo" data-test="ok" />`;

		const result = liliCore().markup({ content });

		expect(result?.code).toContain(`<Sheet id="main" class="foo" data-test="ok" />`);
	});

	it('supports single-quoted attributes and expressions', () => {
		const content = `<kit:sheet title='hello world' open={isOpen} />`;

		const result = liliCore().markup({ content });

		expect(result?.code).toContain(`<Sheet title='hello world' open={isOpen} />`);
	});

	it('imports Sheet only once even when used multiple times', () => {
		const content = `
      <kit:sheet />
      <div />
      <kit:sheet />
    `;

		const result = liliCore().markup({ content });

		const matches = result?.code.match(/import \{ Sheet \} from 'lapikit\/labs\/components';/g);

		expect(matches?.length).toBe(1);
	});

	it('handles nested components correctly', () => {
		const content = `
      <kit:sheet>
        <kit:sheet>
          <span>nested</span>
        </kit:sheet>
      </kit:sheet>
    `;

		const result = liliCore().markup({ content });

		expect(result?.code).toContain('<Sheet>');
		expect(result?.code).toContain('</Sheet>');
	});

	it('adds a regular <script> tag when a module script already exists', () => {
		const content = `
      <script module>
        export const foo = 1;
      </script>

      <kit:sheet />
    `;

		const result = liliCore().markup({ content });

		expect(result?.code).toMatch(/<script module>[\s\S]*<\/script>[\s\S]*<script>/);

		expect(result?.code).toContain(`import { Sheet } from 'lapikit/labs/components';`);
	});

	it('does not transform already-processed code', () => {
		const content = `<kit:sheet />`;

		const firstResult = liliCore().markup({ content });

		expect(firstResult).toBeDefined();

		const firstCode = firstResult!.code;

		const secondResult = liliCore().markup({ content: firstCode });

		expect(secondResult).toBeUndefined();
	});
});
