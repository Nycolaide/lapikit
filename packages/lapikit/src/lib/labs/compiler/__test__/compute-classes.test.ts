import { describe, it, expect } from 'vitest';
import { computeSClasses } from '../mapped-code.js';
import type { SClassProp } from '../types/index.js';

describe('computeSClasses', () => {
	describe('sClass as string', () => {
		it('should return the string when sClass is a non-empty string', () => {
			const result = computeSClasses('btn btn-primary', {});
			expect(result).toBe('btn btn-primary');
		});

		it('should return empty string when sClass is an empty string', () => {
			const result = computeSClasses('', {});
			expect(result).toBe('');
		});
	});

	describe('sClass as array', () => {
		it('should join array elements with spaces', () => {
			const result = computeSClasses(['btn', 'btn-primary'], {});
			expect(result).toBe('btn btn-primary');
		});

		it('should filter out empty strings from array', () => {
			const result = computeSClasses(['btn', '', 'btn-primary'], {});
			expect(result).toBe('btn btn-primary');
		});

		it('should filter out non-string values from array', () => {
			const result = computeSClasses(
				['btn', null, undefined, 'btn-primary'] as unknown as SClassProp,
				{}
			);
			expect(result).toBe('btn btn-primary');
		});

		it('should return empty string for empty array', () => {
			const result = computeSClasses([], {});
			expect(result).toBe('');
		});
	});

	describe('sClass as object', () => {
		it('should add keys where value is true', () => {
			const result = computeSClasses(
				{
					btn: true,
					'btn-primary': true,
					'btn-disabled': false
				},
				{}
			);
			expect(result).toBe('btn btn-primary');
		});

		it('should use string values as class names', () => {
			const result = computeSClasses(
				{
					btn: 'custom-button',
					size: 'large-size'
				},
				{}
			);
			expect(result).toBe('custom-button large-size');
		});

		it('should handle mixed boolean and string values', () => {
			const result = computeSClasses(
				{
					btn: true,
					color: 'text-primary',
					disabled: false
				},
				{}
			);
			expect(result).toBe('btn text-primary');
		});

		it('should filter out empty string values', () => {
			const result = computeSClasses(
				{
					btn: true,
					color: ''
				},
				{}
			);
			expect(result).toBe('btn');
		});

		it('should return empty string for empty object', () => {
			const result = computeSClasses({}, {});
			expect(result).toBe('');
		});
	});

	describe('classDirectiveProps (s-class_xxx)', () => {
		it('should add class name when value is true', () => {
			const result = computeSClasses('', {
				's-class_btn': true,
				's-class_primary': true
			});
			expect(result).toBe('btn primary');
		});

		it('should concatenate base with string value', () => {
			const result = computeSClasses('', {
				's-class_btn': '-primary',
				's-class_size': '-large'
			});
			expect(result).toBe('btn-primary size-large');
		});

		it('should ignore non-true and non-string values', () => {
			const result = computeSClasses('', {
				's-class_btn': true,
				's-class_disabled': false,
				's-class_color': ''
			});
			expect(result).toBe('btn');
		});

		it('should handle mixed boolean and string values', () => {
			const result = computeSClasses('', {
				's-class_btn': true,
				's-class_variant': '-outlined'
			});
			expect(result).toBe('btn variant-outlined');
		});
	});

	describe('combined scenarios', () => {
		it('should combine sClass string and classDirectiveProps', () => {
			const result = computeSClasses('base-class', {
				's-class_modifier': '-active'
			});
			expect(result).toBe('base-class modifier-active');
		});

		it('should combine sClass array and classDirectiveProps', () => {
			const result = computeSClasses(['btn', 'rounded'], {
				's-class_variant': '-primary'
			});
			expect(result).toBe('btn rounded variant-primary');
		});

		it('should combine sClass object and classDirectiveProps', () => {
			const result = computeSClasses(
				{
					btn: true,
					outlined: 'border-solid'
				},
				{
					's-class_color': '-blue'
				}
			);
			expect(result).toBe('btn border-solid color-blue');
		});

		it('should handle all types combined', () => {
			const result = computeSClasses(
				{
					btn: true,
					size: 'text-large'
				},
				{
					's-class_variant': '-outlined',
					's-class_active': true
				}
			);
			expect(result).toBe('btn text-large variant-outlined active');
		});

		it('should return empty string when everything is empty', () => {
			const result = computeSClasses('', {});
			expect(result).toBe('');
		});

		it('should handle null and undefined sClass', () => {
			const result = computeSClasses(undefined, {});
			expect(result).toBe('');
		});
	});

	describe('edge cases', () => {
		it('should handle multiple spaces in string sClass', () => {
			const result = computeSClasses('btn  btn-primary', {});
			expect(result).toBe('btn  btn-primary');
		});

		it('should preserve order of classes', () => {
			const result = computeSClasses(['z-class', 'a-class'], {
				's-class_m': true
			});
			expect(result).toBe('z-class a-class m');
		});

		it('should handle special characters in class names', () => {
			const result = computeSClasses(
				{
					'btn--primary': true,
					btn__icon: 'icon--hover'
				},
				{
					's-class_state': ':active'
				}
			);
			expect(result).toBe('btn--primary icon--hover state:active');
		});
	});
});
