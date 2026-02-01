import { describe, expect, it } from 'vitest';
import { useStyles } from '../components.js';

describe('useStyles', () => {
	describe('no arguments', () => {
		it('should return empty string when no arguments are provided', () => {
			const result = useStyles();
			expect(result).toBe('');
		});

		it('should return empty string when all arguments are undefined', () => {
			const result = useStyles({
				styleAttr: undefined,
				sStyle: undefined,
				styleProps: undefined
			});
			expect(result).toBe('');
		});
	});

	describe('styleAttr', () => {
		it('should return styleAttr when only styleAttr is provided', () => {
			const result = useStyles({ styleAttr: 'color: red' });
			expect(result).toBe('color: red');
		});

		it('should ignore empty styleAttr', () => {
			const result = useStyles({ styleAttr: '' });
			expect(result).toBe('');
		});

		it('should handle multiple style declarations in styleAttr', () => {
			const result = useStyles({ styleAttr: 'color: red; font-size: 16px' });
			expect(result).toBe('color: red; font-size: 16px');
		});
	});

	describe('sStyle - object', () => {
		it('should handle sStyle object with string values', () => {
			const result = useStyles({ sStyle: { color: 'red', fontSize: '16px' } });
			expect(result).toBe('color: red; fontSize: 16px');
		});

		it('should handle sStyle object with single property', () => {
			const result = useStyles({ sStyle: { color: 'blue' } });
			expect(result).toBe('color: blue');
		});

		it('should ignore falsy values in sStyle object', () => {
			const result = useStyles({
				sStyle: { color: 'red', fontSize: '', display: false as unknown as string }
			});
			expect(result).toBe('color: red');
		});

		it('should handle empty sStyle object', () => {
			const result = useStyles({ sStyle: {} });
			expect(result).toBe('');
		});

		it('should handle sStyle with boolean true values', () => {
			const result = useStyles({
				sStyle: { color: 'red', display: true as unknown as string }
			});
			expect(result).toBe('color: red; display: true');
		});

		it('should handle CSS custom properties (variables)', () => {
			const result = useStyles({
				sStyle: { '--primary-color': '#3b82f6', '--spacing': '1rem' }
			});
			expect(result).toBe('--primary-color: #3b82f6; --spacing: 1rem');
		});

		it('should handle numeric string values', () => {
			const result = useStyles({ sStyle: { width: '100px', height: '50px' } });
			expect(result).toBe('width: 100px; height: 50px');
		});
	});

	describe('styleProps (s-style_xxx directives)', () => {
		it('should handle styleProps with string values', () => {
			const result = useStyles({ styleProps: { 's-style_color': 'red' } });
			expect(result).toBe('color: red');
		});

		it('should handle multiple styleProps', () => {
			const result = useStyles({
				styleProps: {
					's-style_color': 'red',
					's-style_fontSize': '16px',
					's-style_display': 'flex'
				}
			});
			expect(result).toBe('color: red; fontSize: 16px; display: flex');
		});

		it('should ignore falsy values in styleProps', () => {
			const result = useStyles({
				styleProps: {
					's-style_color': 'red',
					's-style_fontSize': '',
					's-style_display': false as unknown as string
				}
			});
			expect(result).toBe('color: red');
		});

		it('should handle empty styleProps object', () => {
			const result = useStyles({ styleProps: {} });
			expect(result).toBe('');
		});

		it('should handle styleProps with CSS custom properties', () => {
			const result = useStyles({
				styleProps: {
					's-style_--primary': '#3b82f6',
					's-style_--spacing': '1rem'
				}
			});
			expect(result).toBe('--primary: #3b82f6; --spacing: 1rem');
		});

		it('should handle styleProps with boolean true', () => {
			const result = useStyles({
				styleProps: { 's-style_display': true as unknown as string }
			});
			expect(result).toBe('display: true');
		});
	});

	describe('combination of props', () => {
		it('should combine sStyle and styleAttr', () => {
			const result = useStyles({
				sStyle: { color: 'red' },
				styleAttr: 'font-size: 16px'
			});
			expect(result).toBe('color: red; font-size: 16px');
		});

		it('should combine styleProps and styleAttr', () => {
			const result = useStyles({
				styleProps: { 's-style_color': 'red' },
				styleAttr: 'font-size: 16px'
			});
			expect(result).toBe('color: red; font-size: 16px');
		});

		it('should combine all props in correct order (sStyle, styleProps, styleAttr)', () => {
			const result = useStyles({
				sStyle: { color: 'red' },
				styleProps: { 's-style_fontSize': '16px' },
				styleAttr: 'display: flex'
			});
			expect(result).toBe('color: red; fontSize: 16px; display: flex');
		});

		it('should handle complex combination with multiple properties', () => {
			const result = useStyles({
				sStyle: { color: 'red', backgroundColor: 'white' },
				styleProps: {
					's-style_fontSize': '16px',
					's-style_padding': '10px'
				},
				styleAttr: 'display: flex; align-items: center'
			});
			expect(result).toBe(
				'color: red; backgroundColor: white; fontSize: 16px; padding: 10px; display: flex; align-items: center'
			);
		});

		it('should filter out all falsy values in combination', () => {
			const result = useStyles({
				sStyle: { color: 'red', fontSize: '' },
				styleProps: { 's-style_display': 'flex', 's-style_margin': '' },
				styleAttr: ''
			});
			expect(result).toBe('color: red; display: flex');
		});
	});

	describe('edge cases', () => {
		it('should handle null sStyle', () => {
			const result = useStyles({ sStyle: null as unknown as Record<string, string> });
			expect(result).toBe('');
		});

		it('should handle undefined styleProps', () => {
			const result = useStyles({ styleProps: undefined });
			expect(result).toBe('');
		});

		it('should handle number values in sStyle', () => {
			// Testing runtime behavior with invalid types
			const result = useStyles({
				sStyle: { width: 100 as unknown as string, color: 'red' }
			});
			expect(result).toBe('width: 100; color: red');
		});

		it('should handle null values in sStyle object', () => {
			// Testing runtime behavior with invalid types
			const result = useStyles({
				sStyle: { color: null as unknown as string, fontSize: '16px' }
			});
			expect(result).toBe('fontSize: 16px');
		});

		it('should preserve semicolons in styleAttr', () => {
			const result = useStyles({
				sStyle: { color: 'red' },
				styleAttr: 'font-size: 16px;'
			});
			expect(result).toBe('color: red; font-size: 16px;');
		});

		it('should handle styleAttr with leading/trailing spaces', () => {
			const result = useStyles({ styleAttr: '  color: red  ' });
			expect(result).toBe('  color: red  ');
		});

		it('should handle empty string values correctly', () => {
			const result = useStyles({
				sStyle: { color: '', fontSize: '16px' },
				styleProps: { 's-style_display': '' }
			});
			expect(result).toBe('fontSize: 16px');
		});

		it('should handle zero values in sStyle', () => {
			const result = useStyles({
				sStyle: { margin: '0', padding: '0px', opacity: '0' }
			});
			expect(result).toBe('margin: 0; padding: 0px; opacity: 0');
		});
	});

	describe('CSS properties formatting', () => {
		it('should handle kebab-case properties', () => {
			const result = useStyles({
				sStyle: { 'background-color': 'red', 'font-size': '16px' }
			});
			expect(result).toBe('background-color: red; font-size: 16px');
		});

		it('should handle camelCase properties', () => {
			const result = useStyles({
				sStyle: { backgroundColor: 'red', fontSize: '16px' }
			});
			expect(result).toBe('backgroundColor: red; fontSize: 16px');
		});

		it('should handle mixed kebab-case and camelCase', () => {
			const result = useStyles({
				sStyle: { 'background-color': 'red', fontSize: '16px' }
			});
			expect(result).toBe('background-color: red; fontSize: 16px');
		});
	});
});
