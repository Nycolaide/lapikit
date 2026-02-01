import { describe, expect, it } from 'vitest';
import { useClassName } from '../components.js';

describe('useClassName', () => {
	describe('baseClass', () => {
		it('should return baseClass when only baseClass is provided', () => {
			const result = useClassName({ baseClass: 'btn' });
			expect(result).toBe('btn');
		});

		it('should return empty string when no arguments are provided', () => {
			const result = useClassName();
			expect(result).toBe('');
		});

		it('should ignore empty baseClass', () => {
			const result = useClassName({ baseClass: '' });
			expect(result).toBe('');
		});
	});

	describe('className', () => {
		it('should return className when only className is provided', () => {
			const result = useClassName({ className: 'custom-class' });
			expect(result).toBe('custom-class');
		});

		it('should combine baseClass and className', () => {
			const result = useClassName({ baseClass: 'btn', className: 'custom' });
			expect(result).toBe('btn custom');
		});

		it('should ignore empty className', () => {
			const result = useClassName({ baseClass: 'btn', className: '' });
			expect(result).toBe('btn');
		});
	});

	describe('sClass - string', () => {
		it('should handle sClass as a string', () => {
			const result = useClassName({ sClass: 'primary' });
			expect(result).toBe('primary');
		});

		it('should combine baseClass and sClass string', () => {
			const result = useClassName({ baseClass: 'btn', sClass: 'primary' });
			expect(result).toBe('btn primary');
		});

		it('should ignore empty sClass string', () => {
			const result = useClassName({ baseClass: 'btn', sClass: '' });
			expect(result).toBe('btn');
		});
	});

	describe('sClass - array', () => {
		it('should handle sClass as an array of strings', () => {
			const result = useClassName({ sClass: ['primary', 'large'] });
			expect(result).toBe('primary large');
		});

		it('should combine baseClass and sClass array', () => {
			const result = useClassName({ baseClass: 'btn', sClass: ['primary', 'large'] });
			expect(result).toBe('btn primary large');
		});

		it('should filter out empty strings in array', () => {
			const result = useClassName({ sClass: ['primary', '', 'large', ''] });
			expect(result).toBe('primary large');
		});

		it('should handle empty array', () => {
			const result = useClassName({ baseClass: 'btn', sClass: [] });
			expect(result).toBe('btn');
		});

		it('should ignore non-string values in array', () => {
			// Testing runtime behavior with invalid types
			const result = useClassName({
				sClass: ['primary', null, undefined, 123, true] as unknown as string[]
			});
			expect(result).toBe('primary');
		});
	});

	describe('sClass - object', () => {
		it('should handle sClass object with boolean true values', () => {
			const result = useClassName({ sClass: { primary: true, disabled: true } });
			expect(result).toBe('primary disabled');
		});

		it('should ignore sClass object with boolean false values', () => {
			const result = useClassName({ sClass: { primary: true, disabled: false } });
			expect(result).toBe('primary');
		});

		it('should handle sClass object with string values', () => {
			const result = useClassName({ sClass: { variant: 'primary', size: 'lg' } });
			expect(result).toBe('primary lg');
		});

		it('should ignore empty string values in object', () => {
			const result = useClassName({ sClass: { variant: 'primary', size: '' } });
			expect(result).toBe('primary');
		});

		it('should combine baseClass and sClass object', () => {
			const result = useClassName({ baseClass: 'btn', sClass: { primary: true, large: true } });
			expect(result).toBe('btn primary large');
		});

		it('should handle empty object', () => {
			const result = useClassName({ baseClass: 'btn', sClass: {} });
			expect(result).toBe('btn');
		});

		it('should handle mixed boolean and string values in object', () => {
			const result = useClassName({
				sClass: { primary: true, variant: 'outlined', disabled: false, size: 'md' }
			});
			expect(result).toBe('primary outlined md');
		});
	});

	describe('classProps (s-class_xxx directives)', () => {
		it('should handle classProps with boolean true', () => {
			const result = useClassName({ classProps: { 's-class_active': true } });
			expect(result).toBe('active');
		});

		it('should handle classProps with string values', () => {
			const result = useClassName({ classProps: { 's-class_variant': '-primary' } });
			expect(result).toBe('variant-primary');
		});

		it('should ignore classProps with boolean false', () => {
			const result = useClassName({
				classProps: { 's-class_active': true, 's-class_disabled': false }
			});
			expect(result).toBe('active');
		});

		it('should handle multiple classProps', () => {
			const result = useClassName({
				classProps: {
					's-class_active': true,
					's-class_variant': '-primary',
					's-class_size': '-lg'
				}
			});
			expect(result).toBe('active variant-primary size-lg');
		});

		it('should handle empty classProps object', () => {
			const result = useClassName({ baseClass: 'btn', classProps: {} });
			expect(result).toBe('btn');
		});

		it('should ignore empty string values in classProps', () => {
			const result = useClassName({
				classProps: { 's-class_variant': '-primary', 's-class_size': '' }
			});
			expect(result).toBe('variant-primary');
		});
	});

	describe('combination of all props', () => {
		it('should combine all props in correct order', () => {
			const result = useClassName({
				baseClass: 'btn',
				sClass: 'primary',
				className: 'custom',
				classProps: { 's-class_active': true }
			});
			expect(result).toBe('btn primary active custom');
		});

		it('should handle complex combination with sClass array', () => {
			const result = useClassName({
				baseClass: 'btn',
				sClass: ['primary', 'large'],
				className: 'my-btn',
				classProps: { 's-class_rounded': true, 's-class_shadow': '-md' }
			});
			expect(result).toBe('btn primary large rounded shadow-md my-btn');
		});

		it('should handle complex combination with sClass object', () => {
			const result = useClassName({
				baseClass: 'btn',
				sClass: { primary: true, disabled: false, variant: 'outlined' },
				className: 'custom',
				classProps: { 's-class_active': true }
			});
			expect(result).toBe('btn primary outlined active custom');
		});

		it('should filter out all falsy values', () => {
			const result = useClassName({
				baseClass: '',
				sClass: { primary: false, active: true, size: '' },
				className: '',
				classProps: { 's-class_disabled': false, 's-class_rounded': true }
			});
			expect(result).toBe('active rounded');
		});
	});

	describe('edge cases', () => {
		it('should handle undefined values gracefully', () => {
			const result = useClassName({
				baseClass: undefined,
				sClass: undefined,
				className: undefined,
				classProps: undefined
			});
			expect(result).toBe('');
		});

		it('should handle null values in sClass object', () => {
			// Testing runtime behavior with invalid types
			const result = useClassName({
				sClass: { primary: null } as unknown as Record<string, boolean | string>
			});
			expect(result).toBe('');
		});

		it('should handle number values in classProps', () => {
			// Testing runtime behavior with invalid types
			const result = useClassName({
				classProps: { 's-class_count': 5 } as unknown as Record<string, boolean | string>
			});
			expect(result).toBe('');
		});

		it('should preserve whitespace in class names', () => {
			const result = useClassName({ baseClass: 'btn', className: 'my  custom' });
			expect(result).toBe('btn my  custom');
		});
	});
});
