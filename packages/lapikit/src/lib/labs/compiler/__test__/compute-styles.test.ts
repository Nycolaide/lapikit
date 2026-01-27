import { describe, it, expect } from 'vitest';
import { computeSStyles } from '../mapped-code.js';

describe('computeSStyles', () => {
	describe('sStyle as object', () => {
		it('should convert object to CSS style string', () => {
			const result = computeSStyles(
				{
					color: 'red',
					'font-size': '16px'
				},
				{}
			);
			expect(result).toBe('color: red; font-size: 16px');
		});

		it('should filter out falsy values', () => {
			const result = computeSStyles(
				{
					color: 'red',
					display: false,
					margin: ''
				},
				{}
			);
			expect(result).toBe('color: red');
		});

		it('should handle boolean true values', () => {
			const result = computeSStyles(
				{
					color: 'blue',
					visible: true
				},
				{}
			);
			expect(result).toBe('color: blue; visible: true');
		});

		it('should return empty string for empty object', () => {
			const result = computeSStyles({}, {});
			expect(result).toBe('');
		});

		it('should handle undefined sStyle', () => {
			const result = computeSStyles(undefined, {});
			expect(result).toBe('');
		});

		it('should handle CSS properties with units', () => {
			const result = computeSStyles(
				{
					width: '100px',
					height: '50%',
					padding: '1rem'
				},
				{}
			);
			expect(result).toBe('width: 100px; height: 50%; padding: 1rem');
		});
	});

	describe('styleDirectiveProps (s-style_xxx)', () => {
		it('should add styles from directives', () => {
			const result = computeSStyles(
				{},
				{
					's-style_color': 'red',
					's-style_background': 'blue'
				}
			);
			expect(result).toBe('color: red; background: blue');
		});

		it('should filter out falsy directive values', () => {
			const result = computeSStyles(
				{},
				{
					's-style_color': 'red',
					's-style_display': false,
					's-style_margin': ''
				}
			);
			expect(result).toBe('color: red');
		});

		it('should handle boolean true values in directives', () => {
			const result = computeSStyles(
				{},
				{
					's-style_visible': true,
					's-style_color': 'green'
				}
			);
			expect(result).toBe('visible: true; color: green');
		});

		it('should handle hyphenated CSS properties', () => {
			const result = computeSStyles(
				{},
				{
					's-style_font-size': '14px',
					's-style_text-align': 'center'
				}
			);
			expect(result).toBe('font-size: 14px; text-align: center');
		});
	});

	describe('combined scenarios', () => {
		it('should combine sStyle object and styleDirectiveProps', () => {
			const result = computeSStyles(
				{
					color: 'red',
					'font-size': '16px'
				},
				{
					's-style_margin': '10px',
					's-style_padding': '5px'
				}
			);
			expect(result).toBe('color: red; font-size: 16px; margin: 10px; padding: 5px');
		});

		it('should filter falsy values from both sources', () => {
			const result = computeSStyles(
				{
					color: 'red',
					display: false
				},
				{
					's-style_margin': '10px',
					's-style_padding': ''
				}
			);
			expect(result).toBe('color: red; margin: 10px');
		});

		it('should return empty string when everything is empty', () => {
			const result = computeSStyles({}, {});
			expect(result).toBe('');
		});

		it('should handle mixed boolean and string values', () => {
			const result = computeSStyles(
				{
					color: 'blue',
					visible: true
				},
				{
					's-style_display': 'block',
					's-style_active': true
				}
			);
			expect(result).toBe('color: blue; visible: true; display: block; active: true');
		});
	});

	describe('edge cases', () => {
		it('should preserve order of styles', () => {
			const result = computeSStyles(
				{
					'z-index': '999',
					'a-property': 'value'
				},
				{
					's-style_m-property': 'test'
				}
			);
			expect(result).toBe('z-index: 999; a-property: value; m-property: test');
		});

		it('should handle CSS custom properties (variables)', () => {
			const result = computeSStyles(
				{
					'--primary-color': '#ff0000',
					'--spacing': '1rem'
				},
				{}
			);
			expect(result).toBe('--primary-color: #ff0000; --spacing: 1rem');
		});

		it('should handle calc and other CSS functions', () => {
			const result = computeSStyles(
				{
					width: 'calc(100% - 20px)',
					transform: 'rotate(45deg)'
				},
				{}
			);
			expect(result).toBe('width: calc(100% - 20px); transform: rotate(45deg)');
		});

		it('should handle numeric values', () => {
			const result = computeSStyles(
				{
					opacity: '0.5',
					'z-index': '10'
				},
				{}
			);
			expect(result).toBe('opacity: 0.5; z-index: 10');
		});

		it('should handle color formats', () => {
			const result = computeSStyles(
				{
					color: 'rgb(255, 0, 0)',
					background: '#ff0000',
					border: 'rgba(0, 0, 0, 0.5)'
				},
				{}
			);
			expect(result).toBe('color: rgb(255, 0, 0); background: #ff0000; border: rgba(0, 0, 0, 0.5)');
		});
	});
});
