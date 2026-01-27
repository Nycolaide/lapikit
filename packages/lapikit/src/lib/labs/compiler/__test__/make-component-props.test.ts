import { describe, it, expect } from 'vitest';
import { makeComponentProps } from '../mapped-code.js';

describe('makeComponentProps', () => {
	describe('basic separation', () => {
		it('should separate s-class_ directives into classProps', () => {
			const props = {
				's-class_btn': true,
				's-class_variant': '-primary',
				id: 'test',
				disabled: false
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({
				's-class_btn': true,
				's-class_variant': '-primary'
			});
		});

		it('should separate s-style_ directives into styleProps', () => {
			const props = {
				's-style_color': 'red',
				's-style_font-size': '16px',
				id: 'test',
				disabled: false
			};

			const result = makeComponentProps(props);

			expect(result.styleProps).toEqual({
				's-style_color': 'red',
				's-style_font-size': '16px'
			});
		});

		it('should separate remaining props into restProps', () => {
			const props = {
				's-class_btn': true,
				's-style_color': 'red',
				id: 'test',
				disabled: false,
				onClick: () => {}
			};

			const result = makeComponentProps(props);

			expect(result.restProps).toEqual({
				id: 'test',
				disabled: false,
				onClick: expect.any(Function)
			});
		});
	});

	describe('s-class and s-style base properties', () => {
		it('should exclude s-class base property from all groups', () => {
			const props = {
				's-class': 'btn btn-primary',
				's-class_active': true,
				id: 'test'
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({
				's-class_active': true
			});
			expect(result.styleProps).toEqual({});
			expect(result.restProps).toEqual({
				id: 'test'
			});
		});

		it('should exclude s-style base property from all groups', () => {
			const props = {
				's-style': { color: 'red' },
				's-style_margin': '10px',
				id: 'test'
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({});
			expect(result.styleProps).toEqual({
				's-style_margin': '10px'
			});
			expect(result.restProps).toEqual({
				id: 'test'
			});
		});
	});

	describe('all types combined', () => {
		it('should properly separate all three types of props', () => {
			const props = {
				's-class': 'base-class',
				's-class_btn': true,
				's-class_variant': '-outlined',
				's-style': { display: 'flex' },
				's-style_color': 'blue',
				's-style_padding': '20px',
				id: 'component',
				disabled: false,
				onClick: () => {},
				'data-testid': 'test'
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({
				's-class_btn': true,
				's-class_variant': '-outlined'
			});

			expect(result.styleProps).toEqual({
				's-style_color': 'blue',
				's-style_padding': '20px'
			});

			expect(result.restProps).toEqual({
				id: 'component',
				disabled: false,
				onClick: expect.any(Function),
				'data-testid': 'test'
			});
		});
	});

	describe('edge cases', () => {
		it('should handle empty props object', () => {
			const result = makeComponentProps({});

			expect(result.classProps).toEqual({});
			expect(result.styleProps).toEqual({});
			expect(result.restProps).toEqual({});
		});

		it('should handle props with only s-class directives', () => {
			const props = {
				's-class_btn': true,
				's-class_size': '-large'
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({
				's-class_btn': true,
				's-class_size': '-large'
			});
			expect(result.styleProps).toEqual({});
			expect(result.restProps).toEqual({});
		});

		it('should handle props with only s-style directives', () => {
			const props = {
				's-style_color': 'red',
				's-style_margin': '10px'
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({});
			expect(result.styleProps).toEqual({
				's-style_color': 'red',
				's-style_margin': '10px'
			});
			expect(result.restProps).toEqual({});
		});

		it('should handle props with only regular props', () => {
			const props = {
				id: 'test',
				disabled: true,
				'aria-label': 'Button'
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({});
			expect(result.styleProps).toEqual({});
			expect(result.restProps).toEqual({
				id: 'test',
				disabled: true,
				'aria-label': 'Button'
			});
		});

		it('should handle hyphenated s-class directives', () => {
			const props = {
				's-class_btn-primary': true,
				's-class_font-size': '-large'
			};

			const result = makeComponentProps(props);

			expect(result.classProps).toEqual({
				's-class_btn-primary': true,
				's-class_font-size': '-large'
			});
		});

		it('should handle hyphenated s-style directives', () => {
			const props = {
				's-style_font-size': '14px',
				's-style_background-color': 'white'
			};

			const result = makeComponentProps(props);

			expect(result.styleProps).toEqual({
				's-style_font-size': '14px',
				's-style_background-color': 'white'
			});
		});

		it('should preserve values of different types', () => {
			const fn = () => {};
			const obj = { nested: 'value' };

			const props = {
				's-class_active': true,
				's-style_display': 'block',
				string: 'text',
				number: 42,
				boolean: true,
				null: null,
				undefined: undefined,
				function: fn,
				object: obj,
				array: [1, 2, 3]
			};

			const result = makeComponentProps(props);

			expect(result.restProps).toEqual({
				string: 'text',
				number: 42,
				boolean: true,
				null: null,
				undefined: undefined,
				function: fn,
				object: obj,
				array: [1, 2, 3]
			});
		});
	});

	describe('return object structure', () => {
		it('should always return an object with classProps, styleProps, and restProps keys', () => {
			const result = makeComponentProps({ test: 'value' });

			expect(result).toHaveProperty('classProps');
			expect(result).toHaveProperty('styleProps');
			expect(result).toHaveProperty('restProps');
		});

		it('should return separate objects that do not reference the original props', () => {
			const props = {
				's-class_btn': true,
				's-style_color': 'red',
				id: 'test'
			};

			const result = makeComponentProps(props);

			// Modify result objects
			result.classProps['s-class_new'] = true;
			result.styleProps['s-style_new'] = 'blue';
			result.restProps['newProp'] = 'value';

			// Original should be unchanged
			expect(props).not.toHaveProperty('s-class_new');
			expect(props).not.toHaveProperty('s-style_new');
			expect(props).not.toHaveProperty('newProp');
		});
	});
});
