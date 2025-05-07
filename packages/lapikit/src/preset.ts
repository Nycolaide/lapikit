import type { Lapikit } from '$lib/internal/types.js';

export const config: Lapikit = {
	options: {
		normalize: true, // true | false
		minify: false // true | false
	},
	theme: {
		colorScheme: 'dark', // 'light' | 'dark' | 'auto'
		colors: {
			primary: { light: 'oklch(45% 0.24 277.023)', dark: 'oklch(45% 0.24 277.023)' },
			'on-primary': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			secondary: { light: 'oklch(65% 0.241 354.308)', dark: 'oklch(65% 0.241 354.308)' },
			'on-secondary': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			tertiary: { light: 'oklch(77% 0.152 181.912)', dark: 'oklch(77% 0.152 181.912)' },
			'on-tertiary': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			neutral: { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			'on-neutral': { light: 'oklch(100% 0 0)', dark: 'oklch(100% 0 0)' },
			info: { light: 'oklch(74% 0.16 232.661)', dark: 'oklch(74% 0.16 232.661)' },
			'on-info': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			success: { light: 'oklch(76% 0.177 163.223)', dark: 'oklch(76% 0.177 163.223)' },
			'on-success': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			warning: { light: 'oklch(82% 0.189 84.429)', dark: 'oklch(82% 0.189 84.429)' },
			'on-warning': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			error: { light: 'oklch(71% 0.194 13.428)', dark: 'oklch(71% 0.194 13.428)' },
			'on-error': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(14% 0.005 285.823)' },
			base: { light: 'oklch(100% 0 0)', dark: 'oklch(25.33% 0.016 252.42)' },
			'on-base': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(100% 0 0)' },
			surface: { light: 'oklch(98% 0 0)', dark: 'oklch(23.26% 0.014 253.1)' },
			'on-surface': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(100% 0 0)' },
			container: { light: 'oklch(95% 0 0)', dark: 'oklch(21.15% 0.012 254.09)' },
			'on-container': { light: 'oklch(14% 0.005 285.823)', dark: 'oklch(100% 0 0)' },
			shadow: 'black'
		}
	},
	breakpoints: {
		mobileBreakpoint: 'sm',
		tabletBreakpoint: 'md',
		laptopBreakpoint: 'xl',
		thresholds: {
			_default: 0, // 0px
			xs: '28rem', //448px
			sm: '40rem', //640px
			md: '48rem', //768px
			lg: '64rem', //1024px
			xl: '80rem', //1280px
			'2xl': '96rem', //1536px
			'3xl': '112rem' //1792px
		}
	},
	styles: {
		spacing: '0.125rem', // 2px
		corner: {
			active: true, // true | false
			radius: {
				sm: '0.125rem', // 2px
				md: '0.25rem', // 4px
				lg: '0.5rem', // 8px
				xl: '0.75rem', // 12px
				'2xl': '1rem', // 16px
				'3xl': '1.5rem', // 24px
				full: '9999px' // 9999px
			}
		},
		font: {
			sans: [
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol'
			],
			mono: [
				'SFMono-Regular',
				'ui-monospace',
				'SF Mono',
				'Menlo',
				'Monaco',
				'Consolas',
				'Liberation Mono',
				'Courier New',
				'monospace'
			],
			serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
		}
	}
};
